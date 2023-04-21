// src/api/config.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
})

export default api
