import React, { useState } from 'react';
import { Form } from 'react-router-dom';

export default function ProfileEdit({ setProfile }){
    const [avatar, setAvatar] = useState()

    console.log(avatar)

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
    }

    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-col justify-center relative ml-6 mt-6 mb-6 mr-6">
                <img className="h-32 w-32 mx-auto" src="https://cdn-icons-png.flaticon.com/512/5599/5599530.png"/>
                <div className=" ml-4 flex flex-col h-fit w-full">
                    <input onClick={() => handleAvatarSubmit} onChange={(e) => setAvatar(e.target.files[0])} type="file" name="avatar" className="" />
                    <button>submit</button>
                </div>
            </div>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">who can view your profile</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">highscore visible to:</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right mt-3 mb-6">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">who can view your profile</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}