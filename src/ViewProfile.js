import React, { useState, useEffect } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import PrivateProfile from './PrivateProfile';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

ChartJS.defaults.color = "#22c55e";

export default function ViewProfile({ id }){
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [highScore, setHighScore] = useState(0)
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: "transparent",
            borderColor:  "#047857",
            pointBorderColor: "transparent",
            pointBorderWidth: 4,
            scaleFontColor: "#047857",
        }],
    })

    const options = {
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false,
                }
            },
            y: {
                ticks: {
                    stepSize: 20,
                }
            }
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/scores/user/${window.location.href.slice(-2)}`, {
        })
        .then(r => r.json())
        .then(userData => {
            setUser(userData)
            let userArray = userData;
            let userScores = [];
            userArray.scores.forEach((score) => {
                userScores.push(score.score);
            })
            if (userArray.scores.length > 0){
                setHighScore(Math.max(...userScores));
            } else {
                setHighScore(0)
            }
            data.datasets[0].data = userData.scores.map((value) => {
                return value.score;
            }).slice(-10)
            data.datasets[0].data.forEach(() => data.labels.push(""))
            setIsLoading(false)
        })
    }, [])
    
    if (!user["view_profile?"]) return <PrivateProfile />

    return(
        <div className="relative w-2/5 mt-14 z-20 rounded-xl justify-center mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center mx-auto relative mt-6 mb-6">
                <div className="border-4 border-emerald-500">
                <img className={`h-32 w-32 object-cover`} src={user.avatar_url ? user.avatar_url : "https://avatars.githubusercontent.com/u/35440139?v=4}"}/>
                </div>
                <div className="h-fit mx-auto">
                    <div className="ml-4 flex flex-col h-full w-full">
                        <h3 className="pt-3 text-emerald-500">{user.username} <span className="text-xs">place of origin</span></h3>
                        <p className="text-emerald-500 mt-2">Highscore: {highScore} WPM</p>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-lg underline underline-offset-4 italic text-emerald-500">previous rounds</h2>
            <div className="">
                {isLoading || data.datasets[0].data.length == 0 ? <p className="pb-5 text-center text-emerald-500 font-bold italic">no scores available</p> : <Line className="p-10" data={data} options={options} />}

            </div>
        </div>
    )
}