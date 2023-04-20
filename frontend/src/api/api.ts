import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

export const getAllCompanies = async () => {
  const response = await api.get('/Companies')
  return response.data
}

// // Add a new item
// export const addItem = async (item) => {
//   const response = await api.post('/api/items', item);
//   return response.data;
// };

// // Update an existing item
// export const updateItem = async (id, updatedItem) => {
//   const response = await api.put(`/api/items/${id}`, updatedItem);
//   return response.data;
// };

// // Delete an item
// export const deleteItem = async (id) => {
//   await api.delete(`/api/items/${id}`);
// };
