import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './Test';
import Signin from './Signin';
import Navbar from './Navbar';
import Leaderboard from './LeaderboardRow';
import Profile from './Profile';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(()=> {
    fetch("http://localhost:3000/current_user", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(r => {
      if (r.ok){
        console.log(r)
        setCurrentUser(r)
        return r.json()
      } else {
        console.log(r)
      }
    })
  }, [])

  return (
    <div className="bg-emerald-500 fixed w-screen h-screen justify-center">
      <Router>
        <Navbar current_user={currentUser} />
        <Routes>
          <Route exact path="/" element={
            <Test />
          }/>
          <Route path="/signin" element={
            <Signin />
          }/>
          <Route path="/leaderboard" element={
            <Leaderboard />
          }/>
          <Route path="/profile" element={
            <Profile />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
