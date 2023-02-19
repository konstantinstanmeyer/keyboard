import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileEdit({ current_user }){
    const [viewOrigin, setViewOrigin] = useState(false)
    const [username, setUsername] = useState("")
    const [viewScore, setViewScore] = useState(false)
    const [viewProfile, setViewProfile] = useState(false)
    const [changeUsername, setChangeUsername] = useState(false)
    const navigate = useNavigate();

    function onUserSubmit(e){
        e.preventDefault()
        if (username.length >= 5 && username.length < 20){
            fetch(`http://35.247.18.60/current_user/update`,{
            method:'PATCH',
            headers: {
                Authorization: localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username: username,
                "view_profile?": viewProfile,
                "view_origin?": viewOrigin,
                "view_high_score?": viewScore
            })
            })
            .then((r) => r.json())
            .then((data) => {
                console.log(data)
                setChangeUsername(false)
                navigate('/profile')
            })
        } else {
            alert('username must have 5+ characters')
        }
    }

    useEffect(()=> {
        fetch('http://35.247.18.60/users/current', {
          headers: {
              Authorization: localStorage.getItem("token")
          }
          })
          .then(r => r.json())
          .then(r => {
              if (r.hasOwnProperty('email')){
                  setViewScore(r["view_high_score?"])
                  setViewOrigin(r["view_origin?"])
                  setViewProfile(r["view_profile?"])
                  setUsername(r.username)
              } else {
                  console.log("not signed in")
              }
          })
      }, [])

    console.log(viewScore, viewOrigin, viewProfile)

    return (
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <p onClick={() => navigate('/profile')} className="z-40 absolute left-4 top-3 bg-emerald-500 text-sky-900 text-sm px-2 rounded-md font-bold hover:cursor-pointer">{"<="} go back</p>
            <div className="flex flex-col justify-center relative m-6">
                <img className="h-32 w-32 mx-auto object-cover border-4 border-emerald-500 rounded-md" src={current_user.avatar_url ? current_user.avatar_url : "https://avatars.githubusercontent.com/u/35440139?v=4}"}/>
            </div>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right h-10 flex items-center justify-center">
                    {!changeUsername ? <button onClick={() => setChangeUsername(true)} className="hover:bg-emerald-300 h-6 bg-emerald-500 rounded-md w-full text-sky-900 text-sm font-bold">change username</button> : <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="5+ characters" className="bg-emerald-500 h-6 border-[3px] border-emerald-300 rounded-md w-full placeholder-sky-900/70 text-sky-900 font-bold text-sm text-center"/>}
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3 w-full">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300 w-full">profile: {viewProfile ? "public" : "private"}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li onClick={() => setViewProfile(true)} className="bg-emerald-500 hover:bg-emerald-300 border-b-[4px] border-sky-800 text-sky-900"><a>public</a></li>
                        <li onClick={() => setViewProfile(false)} className="bg-emerald-500 hover:bg-emerald-300 text-sky-900"><a>private</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300 w-full">highscore: {viewScore ? "public" : "private"}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li onClick={() => setViewScore(true)} className="bg-emerald-500 hover:bg-emerald-300 border-b-[4px] border-sky-800 text-sky-900"><a>public</a></li>
                        <li onClick={() => setViewScore(false)} className="bg-emerald-500 hover:bg-emerald-300 text-sky-900"><a>private</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="mx-auto dropdown dropdown-right mt-3 mb-4 w-full">
                    <label tabIndex={0} className="btn w-full no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">origin: {viewOrigin ? "public" : "private"}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li onClick={() => setViewOrigin(true)} className="bg-emerald-500 hover:bg-emerald-300 border-b-[4px] border-sky-800 text-sky-900"><a>public</a></li>
                        <li onClick={() => setViewOrigin(false)} className="bg-emerald-500 hover:bg-emerald-300 text-sky-900"><a>private</a></li>
                    </ul>
                </div>
            </div>
            <button onClick={onUserSubmit} className="text-xl font-bold bg-emerald-500 text-sky-900 hover:text-sky-600 w-1/4 mx-auto mb-4 rounded-md">submit</button>
        </div>
    )
}