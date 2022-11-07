import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import N from './components/N';
import Home from './components/Home';
import About from './components/About';
import NotesState from './Context/notes/NotesState';
import Login from './components/Login';
import Singup from './components/Singup';


function App() {
  return (

    <>
    <NotesState>
    <Router>
    <N/>
    <div className='container'>

  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Singup/>} />
      </Routes>
      </div>
    </Router>
    </NotesState>
    </>
  );
}

export default App;
