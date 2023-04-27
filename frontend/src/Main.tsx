import React, { useRef } from 'react'
import { useQuery, useMutation } from 'react-query'
import * as ApiClient from './generated-client/api'

// Custom hooks for fetching and updating data
const useCompanies = () => {
  const apiClient = new ApiClient.CompaniesApi()

  const {
    data: companies,
    isLoading: loadingCompanies,
    refetch: refetchCompanies,
  } = useQuery('companies', async () => {
    const response = await apiClient.companiesGet()
    return response.data
  })

  const createCompanyMutation = useMutation(
    async (company: ApiClient.Company) => {
      await apiClient.companiesPost(company)
    },
    {
      onSuccess: () => {
        refetchCompanies()
      },
    }
  )

  const updateCompanyMutation = useMutation(
    async (company: ApiClient.Company) => {
      await apiClient.companiesIdPut(company!.companyID!, company)
    },
    {
      onSuccess: () => {
        refetchCompanies()
      },
    }
  )

  // Delete mutation
  const deleteCompanyMutation = useMutation(
    async (companyID: number) => {
      await apiClient.companiesIdDelete(companyID)
    },
    {
      onSuccess: () => {
        refetchCompanies()
      },
    }
  )

  const isError = (error: any): error is Error => error instanceof Error

  const createCompany = (name: string) => {
    createCompanyMutation.mutate({ companyName: name })
  }

  const updateCompany = (id: number, name: string) => {
    const company = companies?.find(
      (c: ApiClient.Company) => c.companyID === id
    )

    if (company && company.companyID !== undefined) {
      updateCompanyMutation.mutate({ ...company, companyName: name })
    }
  }

  const deleteCompany = (id: number) => {
    deleteCompanyMutation.mutate(id)
  }

  const getCompany = (id: number) => {
    return companies?.find((c: ApiClient.Company) => c.companyID === id)
  }

  return {
    companies,
    loadingCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    company: createCompanyMutation.data || updateCompanyMutation.data,
    companyError:
      createCompanyMutation.error ||
      updateCompanyMutation.error ||
      deleteCompanyMutation.error,
    companyErrorMessage: isError(createCompanyMutation.error)
      ? createCompanyMutation.error.message
      : isError(updateCompanyMutation.error)
      ? updateCompanyMutation.error.message
      : '',
    companyLoading:
      createCompanyMutation.isLoading ||
      updateCompanyMutation.isLoading ||
      deleteCompanyMutation.isLoading,
    refetchCompanies,
  }
}

export default function Main() {
  const companyNameRef = useRef<HTMLInputElement>(null)
  const companyIDRef = useRef<HTMLInputElement>(null)

  const {
    companies,
    loadingCompanies,
    updateCompany,
    deleteCompany,
    createCompany,
    getCompany,
    companyErrorMessage,
    companyLoading,
  } = useCompanies()

  if (loadingCompanies) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies?.map((company: any) => (
          <li key={company.companyID}>
            company name: {company.companyName}, company id: {company.companyID}
          </li>
        ))}
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
      {companyErrorMessage && <div>Error: {companyErrorMessage}</div>}

      {companyLoading && <div>Updating company...</div>}
    </div>
  )
}
