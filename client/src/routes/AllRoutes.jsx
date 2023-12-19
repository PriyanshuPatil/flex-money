import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import App from '../App'
import Homepage from '../pages/Homepage'
import Formpage from '../pages/Formpage'
import Payment from '../pages/Payment'
import Changebatch from '../pages/Changebatch'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Signup />} />
      <Route path={"/form"} element={<Formpage />} />
      <Route path={"/payment"} element={<Payment />} />
      <Route path={"/batch"} element={<Changebatch/>} />
    </Routes>
  )
}

export default AllRoutes