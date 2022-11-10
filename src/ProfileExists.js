import React, { useEffect, useState } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { Chart, Line } from 'react-chartjs-2';
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

export default function ProfileExists({ current_user }){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState({
        labels: ["","","","","","","","","","last"],
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
                    callback: (value) => (value) + "WPM"
                }
            }
        }
    }

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://localhost:3000/users/scores/${current_user.id}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
        })
        .then(r => r.json())
        .then(scores => {
            console.log(scores)
            data.datasets[0].data = scores.map((value) => {
                return value.score;
            }).slice(-10)
            setIsLoading(false)
        })
    }, [])

    console.log(data.labels)

    console.log( data.datasets[0].data)

    return (
        <div className="relative w-2/5 mt-14 z-20 rounded-xl justify-center mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center mx-auto relative mt-6 mb-6">
                <img className="h-32 w-32 object-cover border-4 border-emerald-500" src={current_user.avatar_url ? current_user.avatar_url : "https://cdn-icons-png.flaticon.com/512/2458/2458293.png"}/>
                <div className="h-fit mx-auto">
                    <div className="ml-4 flex flex-col h-full w-full">
                        <h3 className="pt-3 text-emerald-500">{current_user.username} <span className="text-xs">place of origin</span></h3>
                        <p className="text-emerald-500 mt-2">high_score: {current_user.id}</p>
                        <button onClick={() => navigate('/profile/edit')} className="bg-emerald-500 text-sky-900 mt-5 rounded-md w-full hover:bg-emerald-300">edit preferences</button>
                    </div>
                </div>
            </div>
            <div className="">
                {isLoading ? null : <Line className="p-10" data={data} options={options} />}
            </div>
        </div>
    )
}