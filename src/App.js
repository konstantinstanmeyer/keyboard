import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './Test';
import Signin from './Signin';
import Navbar from './Navbar';
import Leaderboard from './LeaderboardRow';
import Profile from './Profile';
import Signup from './Signup';
import Info from './Info';
import ProfileEdit from './ProfileEdit';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(()=> {
    fetch('http://localhost:3000/users/current', {
      headers: {
          Authorization: localStorage.getItem("token")
      }
      })
      .then(r => r.json())
      .then(r => {
          if (r.hasOwnProperty('email')){
              setCurrentUser(r)
              console.log(r)
          } else {
              console.log("not signed in")
          }
      })
  }, [])

  return (
    <div className="bg-emerald-500 fixed w-screen h-screen justify-center">
      <Router>
        <Navbar setCurrentUser={setCurrentUser} current_user={currentUser} />
        <Routes>
          <Route exact path="/" element={
            <Test current_user={currentUser} />
          }/>
          <Route path="/signin" element={
            <Signin setCurrentUser={setCurrentUser} />
          }/>
          <Route path="/signup" element={
            <Signup />
          }/>
          <Route path="/leaderboard" element={
            <Leaderboard />
          }/>
          <Route path="/profile" element={
            <Profile current_user={currentUser} />
          }/>
          <Route path="/profile/edit" element={
            <ProfileEdit current_user={currentUser} />
          }/>
          <Route path="/info" element={
            <Info />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
