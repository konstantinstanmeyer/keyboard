import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './Test';
import Signin from './Signin';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Signup from './Signup';
import Info from './Info';
import ProfileEdit from './ProfileEdit';
import ViewProfile from './ViewProfile';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [visitedId, setVisitedId] = useState(undefined)
  
  useEffect(()=> {
    fetch('http://35.247.18.60/users/current', {
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
      <div className="relative w-screen h-auto justify-center">
        <div className="fixed h-screen w-screen bg-emerald-500 -z-40"></div>
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
              <Signup setCurrentUser={setCurrentUser} />
            }/>
            <Route path="/leaderboard" element={
              <Leaderboard setVisitedId={setVisitedId} />
            }/>
            <Route path="/profile" element={
              <Profile current_user={currentUser} />
            }/>
            <Route path="/profile/edit" element={
              <ProfileEdit current_user={currentUser} />
            }/>
            <Route path="/profile/:id" element={
              <ViewProfile id={visitedId} />
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
