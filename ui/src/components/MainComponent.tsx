import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddFeatureModal from './AddFeatureModal'
import AddTestCase from './AddTestCase'
import FeaturesList from './FeaturesList'
import MainNavbar from './MainNavbar'
import TestCasesAccordion from './TestCasesAccordion'

export default function MainComponent() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path='/' element={<FeaturesList />} />
        <Route path='/features/accordion/:id' element={<TestCasesAccordion />} />
        <Route path='/features/:id/addTestCase' element={<AddTestCase />} />
      </Routes>
      <AddFeatureModal />
    </BrowserRouter>
  )
}
