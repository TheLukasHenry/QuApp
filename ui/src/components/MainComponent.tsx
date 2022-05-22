import React, { useState } from 'react'
import MainNavbar from './MainNavbar'
import FeaturesList from './FeaturesList'
import Feature from './Feature'
import AddTestCase from './AddTestCase'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

export const FeatureContext = React.createContext<any>({})

export default function MainComponent() {
  const [show, setShow] = useState(false)
  const modalToggle = () => setShow(!show)

  const FeatureContextValue = {
    show,
    modalToggle,
  }

  return (
    <BrowserRouter>
      <MainNavbar />
      <FeatureContext.Provider value={FeatureContextValue}>
      <Routes>
        <Route path='/' element={<FeaturesList />} />
        <Route path='/features/:id' element={<Feature />} />
        <Route path='/features/:id/addTestCase' element={<AddTestCase />} />
        <Route path='/features/:id/addTestCase/:testCaseId' element={<AddTestCase />} />
        {/* <Route path='/features/:id/addTestCase/:testCaseId?' element={<AddTestCase />} /> */}
      </Routes>
      </FeatureContext.Provider>
    </BrowserRouter>
  )
}
