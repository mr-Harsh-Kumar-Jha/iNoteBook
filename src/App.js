
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './Context/NoteState';
import {
   BrowserRouter as Router,
   Route,
   Routes
 } from "react-router-dom";


function App() {
   return (
      <>
      <NoteState>
         <Router>
         <Navbar/>
            <div className='container ' >
               <Routes>
               <Route exact path="/" element={<Home />} />
               <Route exact path="/about" element={<About />} />
               </Routes>
            </div>
         </Router>
         </NoteState>
      </>
   );
}

export default App;
