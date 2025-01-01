import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
        <h1 className='text-2xl text-center lg:text-4xl'>DevOps project is initilized</h1>
    </div>
  )
}

export default App