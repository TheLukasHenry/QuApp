import React, { useState, useEffect } from 'react'
import * as ApiClient from './generated-client/api'

export default function Main() {
  const [companies, setCompanies]: any = useState([])
  const [loading, setLoading] = useState(true)

  const apiClient = new ApiClient.CompaniesApi()
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiClient.companiesGet()
        setCompanies(response.data)
      } catch (error) {
        console.error('Error fetching companies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Companies</h1>
      <ul>
        {companies.map((company: any) => (
          <li key={company.companyID}>{company.companyName}</li>
        ))}
      </ul>
    </div>
  )
}
