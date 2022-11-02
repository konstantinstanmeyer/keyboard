import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './Test';
import Signup from './Signup';
import Navbar from './Navbar';
import Leaderboard from './LeaderboardRow';
import Profile from './Profile';

function App() {
  fetch("http://localhost:3000/signup", {
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    user: {
      email: "test@test.com",
      password: "password",
    },
  }),
})
  .then((res) => {
    if (res.ok) {
      console.log(res.headers.get("Authorization"));
      localStorage.setItem("token", res.headers.get("Authorization"));
      return res.json();
    } else {
      throw new Error(res);
    }
  })
  .then((json) => console.dir(json))
  .catch((err) => console.error(err));

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
          <Route path="/profile" element={
            <Profile />
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
