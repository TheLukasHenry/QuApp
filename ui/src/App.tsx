import React from 'react'

import MainComponent from './components/MainComponent'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export const FeatureContext = React.createContext<any>({})


function App() {
  const [show, setShow] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<string | undefined>()

  const modalToggle = (id?: string) => {
    setShow(!show)
    setSelectedId(id)
  }

  const FeatureContextValue = {
    show,
    modalToggle,
    selectedId,
  }
  
  return  <FeatureContext.Provider value={FeatureContextValue}>
    <MainComponent />
    </FeatureContext.Provider>
}

export default App
