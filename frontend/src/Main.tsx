import React, { useState, useEffect } from 'react'
import { getAllCompanies } from './api/api'

export default function Main() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getAllCompanies()
        setCompanies(data)
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
