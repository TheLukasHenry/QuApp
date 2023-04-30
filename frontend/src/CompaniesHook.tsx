// restful-react generated hook with use of swagger OperationId
import React, { useRef } from 'react'
import {
  useCompaniesGETGetAllCompanies,
  useCompaniesPOSTCreateCompany,
  useCompaniesPUTUpdateCompany,
  useCompaniesDELETEDeleteCompany,
  Company,
} from './hooks'

export default function Companies() {
  const companyNameRef = useRef<HTMLInputElement>(null)
  const companyIDRef = useRef<HTMLInputElement>(null)

  const {
    data: companies,
    loading: loadingCompanies,
    refetch: refetchCompanies,
  } = useCompaniesGETGetAllCompanies({})

  const createCompanyMutation = useCompaniesPOSTCreateCompany({})
  const updateCompanyMutation = useCompaniesPUTUpdateCompany({ id: 0 })
  const deleteCompanyMutation = useCompaniesDELETEDeleteCompany({})

  const createCompany = (name: string) => {
    createCompanyMutation.mutate({ companyName: name })
  }

  const updateCompany = (id: number, name: string) => {
    const company = companies?.find((c: Company) => c.companyID === id)

    if (company && company.companyID !== undefined) {
      updateCompanyMutation.mutate(
        { ...company, companyName: name },
        { pathParams: { id } }
      )
    }
  }

  const deleteCompany = (id: number) => {
    deleteCompanyMutation.mutate(id)
  }

  const getCompany = (id: number) => {
    return companies?.find((c: Company) => c.companyID === id)
  }

  if (loadingCompanies) {
    return <div>Loading...</div>
  }

  console.log('companies: ', companies)

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {/* {companies?.map((company: Company) => (
          <li key={company.companyID}>
            company name: {company.companyName}, company id: {company.companyID}
          </li>
        ))} */}
      </ul>
      <input
        type="text"
        id="companyName"
        name="companyName"
        placeholder="Company name"
        ref={companyNameRef}
      />
      <input
        type="text"
        id="companyID"
        name="companyID"
        placeholder="company id"
        ref={companyIDRef}
      />

      <button
        onClick={() => {
          const companyName = companyNameRef.current
          const companyID = companyIDRef.current
          if (!companyName || !companyID) {
            return
          }
          updateCompany(+companyID.value, companyName.value.toString())
        }}
      >
        Update Company
      </button>
      <button
        onClick={() => {
          const companyName = companyNameRef.current
          if (!companyName) {
            return
          }
          createCompany(companyName.value.toString())
        }}
      >
        Create Company
      </button>
      <button
        onClick={() => {
          const companyID = companyIDRef.current
          if (!companyID) {
            return
          }
          deleteCompany(+companyID.value)
        }}
      >
        Delete Company
      </button>
      <button
        onClick={() => {
          const companyID = companyIDRef.current
          if (!companyID) {
            return
          }
          const company = getCompany(+companyID.value)
          if (company) {
            console.log(company)
          }
        }}
      >
        Get Company
      </button>

      {createCompanyMutation.error && (
        <div>Error: {createCompanyMutation.error.message}</div>
      )}
      {updateCompanyMutation.error && (
        <div>Error: {updateCompanyMutation.error.message}</div>
      )}
      {deleteCompanyMutation.error && (
        <div>Error: {deleteCompanyMutation.error.message}</div>
      )}
      {(createCompanyMutation.loading ||
        updateCompanyMutation.loading ||
        deleteCompanyMutation.loading) && <div>Updating company...</div>}
    </div>
  )
}

// // chatgpt hook generated from generatedClient's api.ts
// import { useRef } from 'react'
// import { useQuery, useMutation } from 'react-query'
// import * as ApiClient from './generatedClient/api'

// const useCompanies = () => {
//   const apiClient = new ApiClient.CompaniesApi()

//   const {
//     data: companies,
//     isLoading: loadingCompanies,
//     refetch: refetchCompanies,
//   } = useQuery('companies', async () => {
//     const response = await apiClient.companiesGet()
//     return response.data
//   })

//   const getCompany = useQuery(
//     ['company', { enabled: false }],
//     async (queryContext: any, { id }: { id: number }) => {
//       const response = await apiClient.companiesIdGet(id)
//       return response.data
//     }
//   )

//   const updateCompany = useMutation(
//     (updatedCompany: ApiClient.Company) =>
//       apiClient.companiesIdPut(updatedCompany.id!, updatedCompany),
//     {
//       onSuccess: () => {
//         refetchCompanies()
//       },
//     }
//   )

//   const deleteCompany = useMutation(
//     (id: number) => apiClient.companiesIdDelete(id),
//     {
//       onSuccess: () => {
//         refetchCompanies()
//       },
//     }
//   )

//   const createCompany = useMutation(
//     (company: ApiClient.Company) => apiClient.companiesPost(company),
//     {
//       onSuccess: () => {
//         refetchCompanies()
//       },
//     }
//   )

//   return {
//     companies,
//     loadingCompanies,
//     updateCompany,
//     deleteCompany,
//     createCompany,
//     getCompany,
//   }
// }

// export default useCompanies
