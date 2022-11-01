import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate();

    return(
        <div className="relative w-3/4 z-20 mx-auto pt-20">
            <div className="bg-sky-900 flex flex-row items-center w-3/4 h-14 mx-auto rounded-xl mb-7 relative">
                <h3 className="text-lg ml-2 font-bold w-fit px-2 text-emerald-500 select-none">Typing App</h3>
                <li className="mx-2 list-none">
                    <a onClick={() => navigate('/')} className="hover:cursor-pointer hover:underline text-emerald-500">Play</a>
                </li>
                <li className="mx-2 list-none">
                    <a className="hover:cursor-pointer hover:underline text-emerald-500">Blog</a>
                </li>
                <div className="ml-auto flex flex-row items-center">
                    <ul className="list-none p-0 flex flex-row mr-2">
                        <li className="mx-2">
                            <a onClick={() => navigate('/signup')} className="hover:cursor-pointer hover:underline text-emerald-500">Sign In</a>
                        </li>
                        <li className="mx-2">
                            <a onClick={() => navigate('/leaderboard')} className="hover:cursor-pointer hover:underline text-emerald-500">Leaderboard</a>
                        </li>
                    </ul>
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="h-10 w-10 mr-4 hover:cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}