import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Test from './Test';
import Signup from './Signup';
import Navbar from './Navbar';

function App() {
  return (
    <div className="bg-emerald-500 w-screen h-screen justify-center">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={
            <Home />
          }/>
          <Route path="/signup" element={
            <Signup />
          }/>
          <Route path="/test" element={
            <Test />
          }/>
          <Route path="/navbar" element={
            <Navbar />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
