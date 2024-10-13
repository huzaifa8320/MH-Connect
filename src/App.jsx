import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import UserContextProvider from './Context/UserContext'
import Rigister from './Pages/Rigister'

function App() {

  return (
    <>
      <BrowserRouter>
      <UserContextProvider>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/rigister' element={<Rigister/>} />
        </Routes>
      </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
