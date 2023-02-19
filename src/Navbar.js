import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ current_user ,setCurrentUser }){
    const navigate = useNavigate();

    function handleLogout(){
        let token = localStorage.getItem('token')
        fetch(`http://35.247.18.60/logout`,{
            method: "DELETE",
            headers: {
                Authorization: token
            }
        })
        .then(r => {
            if(r.ok){
                localStorage.removeItem('token');
                setCurrentUser({})
                navigate('/');
            } else {
                throw new Error(r.status)
            }
        })
    }

    return(
        <div className="relative w-3/4 z-20 mx-auto pt-20">
            <div className="bg-sky-900 flex flex-row items-center w-3/4 h-14 mx-auto rounded-xl relative">
                <h3 className="text-lg ml-2 font-bold w-fit px-2 text-emerald-500 select-none">Typing App</h3>
                <li className="mx-2 list-none">
                    <a onClick={() => navigate('/')} className="hover:cursor-pointer hover:underline text-emerald-500">Play</a>
                </li>
                <li className="mx-2 list-none">
                    <a onClick={() => navigate('info')} className="hover:cursor-pointer hover:underline text-emerald-500">Info</a>
                </li>
                <div className="ml-auto flex flex-row items-center">
                    <ul className="list-none p-0 flex flex-row mr-2">
                        <li className="mx-2">
                            {current_user.hasOwnProperty('email') ? null : <a onClick={() => navigate('/signin')} className="hover:cursor-pointer hover:underline text-emerald-500">Sign In</a>}
                        </li>
                        <li className="ml-2">
                            <a onClick={() => navigate('/leaderboard')} className="hover:cursor-pointer hover:underline text-emerald-500">Leaderboard</a>
                        </li>
                        <li className="mx-2">
                            {current_user.hasOwnProperty('email') ? <a onClick={() => handleLogout()} className="hover:cursor-pointer hover:underline text-emerald-500">Log out</a> : null}
                        </li>
                    </ul>
                    {window.location.href.slice(-7) == 'profile' || window.location.href.slice(-12) == 'profile/edit' || !current_user.hasOwnProperty('avatar_url') ? null : <img onClick={() => navigate('/profile')} src={current_user.avatar_url === null || !current_user.hasOwnProperty('avatar_url') ? "https://avatars.githubusercontent.com/u/35440139?v=4}" : current_user.avatar_url} className="h-10 rounded-full object-cover border-emerald-500 border-2 w-10 mr-4 hover:cursor-pointer"/>}
                </div>
            </div>
        </div>
    )
}