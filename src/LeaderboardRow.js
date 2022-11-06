import React, { useEffect, useState } from 'react';

export default function Leaderboard({ id }){
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data)
            console.log(data)
        })
    }, [])

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
                    <tbody class="overflow-y-scroll">
                        {users.map((user, i) => {
                            return(
                                <tr>
                                    <td className="bg-sky-800 w-1/4">
                                        <div className="flex items-center space-x-3">
                                            <div className="items-center flex flex-row avatar pr-0 ml-2">
                                                <p className="w-3 text-lg font-bold text-emerald-500">{i + 1}</p>
                                                <div className="ml-12 rounded-full mask w-12 h-12 border-2 border-emerald-500">
                                                    <img className="" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 font-bold">
                                        <span className="">{user.email}</span>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 text-md italic">
                                        <span className="hover:underline hover:cursor-pointer">view profile</span>
                                    </td>
                                    <th className="bg-sky-800 w-1/4 text-emerald-500">
                                        <span className="">{user.high_score}</span>
                                    </th>
                                </tr>
                            )
                        })}
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