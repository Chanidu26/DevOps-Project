import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App