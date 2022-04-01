import React from 'react'
import MainNavbar from './MainNavbar'
import Home from './Home'
import CardsList from './CardsList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function MainComponent() {
    // const cardsArray = [1, 2, 3, 4, 5, 6]


  return (
    <BrowserRouter>
      <MainNavbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/features' element={<CardsList  />} />
      </Routes>
    </BrowserRouter>
  )

}

