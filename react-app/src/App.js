import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Contact } from './components/contactpage';



import { useState } from 'react';


import Login from './components/login'
import Homepage from './components/homepage';
 

const [showContact, setShowContact] = useState(false);




function App() {

  const toggleContact = () => {
    setShowContact(prevState => !prevState);
  };

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