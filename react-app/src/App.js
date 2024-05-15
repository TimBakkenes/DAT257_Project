import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Homepage from './components/homepage';
import SignUp from "./components/signUp"
 
function App() {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/home" element={<Homepage/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
   
export default App;