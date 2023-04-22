import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import * as ApiClient from './generated-client/api'

export default function Main() {
  const companyNameRef = useRef<HTMLInputElement>(null)
  const companyIDRef = useRef<HTMLInputElement>(null)

  const apiClient = new ApiClient.CompaniesApi()
  const apiClientFeatures = new ApiClient.FeaturesApi()

  const fetchCompanies = async () => {
    const response = await apiClient.companiesGet()
    return response.data
  }

  const fetchFeatures = async () => {
    const response = await apiClientFeatures.featuresGet()
    return response.data
  }

  const {
    data: companies,
    isLoading: loadingCompanies,
    refetch: refetchCompanies,
  } = useQuery('companies', fetchCompanies)
  const { data: features, isLoading: loadingFeatures } = useQuery(
    'features',
    fetchFeatures
  )

  if (loadingCompanies || loadingFeatures) {
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
        onClick={async () => {
          const companyName = companyNameRef.current
          const companyID = companyIDRef.current
          if (!companyName || !companyID) {
            return
          }
          const response = await apiClient.companiesIdPut(+companyID.value, {
            companyID: +companyID.value,
            companyName: companyName.value.toString(),
          })
          console.log(response)

          // Call refetchCompanies after updating the company
          refetchCompanies()
        }}
      >
        Update Company
      </button>
      <h1>Features</h1>
      <ul>
        {features?.map((feature: any) => (
          <li key={feature.featureID}>
            feature name: {feature.featureName}, feature id: {feature.featureID}
          </li>
        ))}
      </ul>
    </div>
  )
}
