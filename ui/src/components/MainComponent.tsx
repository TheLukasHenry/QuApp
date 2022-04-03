import React from 'react'
import MainNavbar from './MainNavbar'
import FeaturesList from './FeaturesList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GraphqlExample from './graphqlExample'

export default function MainComponent() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path='/' element={<FeaturesList />} />
      </Routes>

      {/* <GraphqlExample /> */}
    </BrowserRouter>
  )
}
