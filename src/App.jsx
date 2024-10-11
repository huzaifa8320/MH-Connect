import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import UserContextProvider from './Context/UserContext'
import SignUp from './Pages/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>
      <UserContextProvider>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
      </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
