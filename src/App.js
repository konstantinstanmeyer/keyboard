import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Test from './Test';
import Signup from './Signup';
import Navbar from './Navbar';
import Leaderboard from './LeaderboardRow';

function App() {
  return (
    <div className="bg-emerald-500 fixed w-screen h-screen justify-center">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <Test />
          }/>
          <Route path="/signup" element={
            <Signup />
          }/>
          <Route path="/leaderboard" element={
            <Leaderboard />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
