import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useState } from 'react';

import Login from './components/login'
import Homepage from './components/homepage';
 


function App() {

  

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Homepage/>} />
        </Routes>
      </BrowserRouter>

    </div>
    
      
    
    
  );
}
   
export default App;