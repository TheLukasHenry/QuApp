import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddFeatureModal from './AddFeatureModal'
import AddTestCase from './AddTestCase'
import Feature from './Feature'
import FeaturesList from './FeaturesList'
import MainNavbar from './MainNavbar'




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
       <AddFeatureModal />
    </BrowserRouter>
  )
}
