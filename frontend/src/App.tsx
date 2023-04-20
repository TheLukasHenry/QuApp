import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import Main from './Main'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export default App
