import React, { useState } from 'react';
import { Form } from 'react-router-dom';

export default function ProfileEdit({ current_user }){
    const [avatar, setAvatar] = useState(null)
    const [origin, setOrigin] = useState(false)
    const [viewScore, setViewScore] = useState(false)
    const [viewProfile, setViewProfile] = useState(false)

    // function onSubmit(e){
    //     e.preventDefault()
    //     fetch(`/profiles/${profileID}`,{
    //       method:'PATCH',
    //       headers: {'Content-Type': 'application/json'},
    //       body:JSON.stringify(formData)
    //     })
    //     .then(res => {
    //       if(res.ok){
    //         res.json().then(updateProfile)
    //         console.log('howdy from an updated profile')
    //         setHasNotSubmitted(() => false)
    //       } else {
    //         //Display errors
    //         res.json().then(data => setErrors(Object.entries(data.errors).map(e => `${e[0]} ${e[1]}`)))
    //       }
    //     })
        
    //   }

    function handleAvatarSubmit(e){
        e.preventDefault();
        if (avatar !== null){
            const form = new FormData();
            form.append("avatar", avatar)
            fetch("http://localhost:3000/avatar", {
            method: "post",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            body: form,
            })
            .then((res) => {
                if (res.ok) {
                console.log(res);
                return res.json();
                } else {
                throw new Error(res);
                }
            })
        } else {
            alert("no file has been attached")
        }
    }

    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-col justify-center relative ml-6 mt-6 mr-6">
                <img className="h-32 w-32 mx-auto" src={current_user.avatar_url ? current_user.avatar_url : "https://cdn-icons-png.flaticon.com/512/2458/2458293.png"}/>
                <div className="flex flex-col py-3">
                    <input onChange={(e) => setAvatar(e.target.files[0])} placeholder="yes" type="file" name="avatar" className="mx-auto w-1/3 bg-red"  />
                    <button className="w-1/3 mx-auto" onClick={(e) => handleAvatarSubmit(e)}>submit</button>
                </div>
            </div>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3 w-full">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300 w-full">profile: private</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>private</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>public</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300 w-full">highscore: private</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>public</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>private</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="mx-auto dropdown dropdown-right mt-3 mb-6 w-full">
                    <label tabIndex={0} className="btn w-full no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">origin: private</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>public</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>private</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}