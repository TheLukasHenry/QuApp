import api from './config'

// Get all companies
export const getAllCompanies = async () => {
  const response = await api.get('/Companies')
  return response.data
}

// Get a single company by ID
export const getCompany = async (id: number) => {
  const response = await api.get(`/Companies/${id}`)
  return response.data
}

// Create a new company
export const createCompany = async (companyName: string) => {
  const response = await api.post('/Companies', { companyName })
  return response.data
}

// Update an existing company
export const updateCompany = async (id: number, companyName: string) => {
  const response = await api.put(`/Companies/${id}`, { companyName })
  return response.data
}

// Delete a company by ID
export const deleteCompany = async (id: number) => {
  const response = await api.delete(`/Companies/${id}`)
  return response.status
}
