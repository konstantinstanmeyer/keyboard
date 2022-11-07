import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileGuest({ current_user }){
    const navigate = useNavigate();

    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <img className="h-32 w-32 mx-auto m-6 mb-2" src={current_user.ok ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" : "https://cdn-icons-png.flaticon.com/512/2458/2458293.png"}/>
            <p className="text-center text-lg text-emerald-500">guest</p>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <p onClick={() => navigate('/signup')} className="w-fit mx-auto hover:cursor-pointer italic text-emerald-500 text-center mb-6 animate-pulse">sign up to unlock</p>
        </div>
    )
}