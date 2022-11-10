import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard({ setVisitedId }){
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data.sort(function(a, b){return b.high_score-a.high_score}))
            console.log(data)
            setIsLoading(false)
        })
    }, [])

    console.log(users)

    function handleVisitProfile(user){
        console.log(user.id)
        navigate(`/profile/${user.id}`)
    }
    
    console.log(isLoading)

    return(
        <div class="flex relative justify-center h-3/5 rounded-b-lg">
            <div class="overflow-x-auto w-1/2 mt-10 h-full">
                <table class="table w-full h-full">
                    <thead class="bg-sky-900">
                        <tr class="">
                            <th class="text-emerald-500 bg-sky-900"></th>
                            <th class="bg-sky-900 text-emerald-500 text-lg">Username</th>
                            <th class="text-emerald-500 bg-sky-900"></th>
                            <th class="text-emerald-500 bg-sky-900 text-lg">Highscore</th>
                        </tr>
                    </thead>
                    <tbody class="overflow-y-scroll h-full bg-sky-800">
                        {isLoading ?  
                        <tr className="relative w-full">
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>                      
                        <img className="w-1/4 absolute left-[39%] top-[25%] m-0 animate-spin" src="https://cdn-icons-png.flaticon.com/512/7329/7329801.png"/>
                        </tr>: users.map((user, i) => {
                            return (
                                <tr>
                                    <td className="bg-sky-800 w-1/4">
                                        <div className="flex items-center space-x-3">
                                            <div className="items-center flex flex-row avatar pr-0 ml-2">
                                                <p className="w-3 text-lg font-bold text-emerald-500">{i + 1}</p>
                                                <div className="ml-12 rounded-full mask w-12 h-12 border-2 border-emerald-500">
                                                    <img className="" src={user.avatar_url ? user.avatar_url : `https://cdn-icons-png.flaticon.com/512/3135/3135715.png`} alt="Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 font-bold">
                                        <span className="">{user.username}</span>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 text-md italic">
                                        <span onClick={() => handleVisitProfile(user)} className="hover:underline hover:cursor-pointer">view profile</span>
                                    </td>
                                    <th className="bg-sky-800 w-1/4 text-emerald-500">
                                        <span className="">{user.high_score}</span>
                                    </th>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

{/* <tr>
    <th class="text-emerald-500 bg-sky-800">{i + 1}</th>
    <td class="text-emerald-500 bg-sky-800">{user.email}</td>
    <td class="bg-sky-800"><span class="italic hover:underline hover:text-emerald-300 hover:cursor-pointer text-emerald-500">view profile</span></td>
    <td class="text-emerald-500 bg-sky-800">{user.high_score}</td>
</tr> */}