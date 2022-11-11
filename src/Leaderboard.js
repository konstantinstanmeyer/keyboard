import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Leaderboard(){
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [style, setStyle] = useState("random")
    const [wordCount, setWordCount] = useState(25)
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

    console.log(users)

    function getHighestScore(user){
        let score = 0;
        if (user.scores.length === 0){
            score = 0;
        } else {
            let scores = user.scores.filter((score) => score.style === style).filter((score) => score.word_length === wordCount)
            if (scores.length === 0){
                score = 0
            } else {
                score = scores.sort((a, b) => b.score - a.score)[0]
            }
        }
        return Math.floor(parseInt(score.score))
    }


    const displayedUsers = users.filter(user => user["view_high_score?"]).filter(user => user.scores.length >= 1)

    // confirmUser(users[1])

    // function confirmUser(user){
    //     for (let i = 0; i < user.scores.length; i++){
    //         console.log(user.scores[i])
    //     }
    // }

    return(
        <div class="flex relative flex-col justify-center h-3/5 rounded-b-lg">
            <div className="bg-sky-900 w-2/5 h-14 mx-auto my-6 rounded-lg relative items-center flex flex-row">
                <p onClick={() => setStyle('random')} className={`w-1/2 ${style === "random" ? "text-emerald-500/100": "text-emerald-500/40"} text-center hover:text-emerald-500/100 hover:cursor-pointer`}>random</p>
                <p onClick={() => setStyle('quote')} className={`w-1/2 text-center ${style === "quote" ? "text-emerald-500/100": "text-emerald-500/40"} hover:text-emerald-500/100 hover:cursor-pointer`}>quote</p>
                <div className="w-[2px] h-[60%] bg-emerald-500"></div>
                <p onClick={() => setWordCount(15)} className={`w-1/2 ${wordCount === 15 ? "text-emerald-500/100": "text-emerald-500/40"} text-center hover:text-emerald-500/100 hover:cursor-pointer`}>15</p>
                <p onClick={() => setWordCount(25)} className={`w-1/2 ${wordCount === 25 ? "text-emerald-500/100": "text-emerald-500/40"} text-center hover:text-emerald-500/100 hover:cursor-pointer`}>25</p>
                <p onClick={() => setWordCount(50)} className={`w-1/2 ${wordCount === 50 ? "text-emerald-500/100": "text-emerald-500/40"} text-center hover:text-emerald-500/100 hover:cursor-pointer`}>50</p>
            </div>
            <div class="w-1/2 mx-auto h-3/5 relative">
                <table class="table w-full h-20">
                    <thead class="bg-sky-900">
                        <tr class="">
                            <th class="text-emerald-500 bg-sky-900"></th>
                            <th class="bg-sky-900 text-emerald-500 text-lg">Username</th>
                            <th class="text-emerald-500 bg-sky-900"></th>
                            <th class="text-emerald-500 bg-sky-900 text-lg">Highscore</th>
                        </tr>
                    </thead>
                    <tbody className="" class="overflow-y-scroll h-3/5 bg-sky-800">
                        {isLoading ?
                        <tr className="relative w-full">
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>
                        <td className="w-1/4 h-full bg-sky-800"></td>                      
                        <img className="w-1/4 absolute left-[39%] top-[25%] m-0 animate-spin" src="https://cdn-icons-png.flaticon.com/512/7329/7329801.png"/>
                        </tr>: displayedUsers.map((user, i) => {
                            return (
                                <tr className="">
                                    <td className="bg-sky-800 w-1/4">
                                        <div className="flex items-center space-x-3">
                                            <div className="items-center flex flex-row avatar pr-0 ml-2">
                                                <p className="w-3 text-lg font-bold text-emerald-500">{i + 1}</p>
                                                <div className="ml-12 object-cover rounded-full mask w-12 h-12 border-2 border-emerald-500">
                                                    <img className="" src={user.avatar_url ? user.avatar_url : `https://avatars.githubusercontent.com/u/35440139?v=4}`} alt="Avatar" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 font-bold">
                                        <span className="">{user.username}</span>
                                    </td>
                                    <td className="bg-sky-800 w-1/4 text-emerald-500 text-md italic">
                                        {user["view_profile?"] ? <span onClick={() => handleVisitProfile(user)} className="hover:underline hover:cursor-pointer">view profile</span> : <span className="">private profile</span>}
                                    </td>
                                    <th className="bg-sky-800 w-1/4 text-emerald-500">
                                        <span className="">{user.scores.length >= 1 ? getHighestScore(user) : 0} WPM</span>
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