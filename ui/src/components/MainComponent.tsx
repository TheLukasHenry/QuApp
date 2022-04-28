import React from 'react'
import MainNavbar from './MainNavbar'
import FeaturesList from './FeaturesList'
import Feature from './Feature'
import AddTestCase from './AddTestCase'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


export default function MainComponent() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path='/' element={<FeaturesList />} />
        <Route path='/features/:id' element={<Feature />} />
        <Route path='/features/:id/addTestCase' element={<AddTestCase />} />
        <Route path='/features/:id/addTestCase/:testCaseId' element={<AddTestCase />} />
        {/* <Route path='/features/:id/addTestCase/:testCaseId?' element={<AddTestCase />} /> */}



      </Routes>
    </BrowserRouter>
  )
}
