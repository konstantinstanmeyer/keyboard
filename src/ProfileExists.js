import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [highScore, setHighScore] = useState(0)
    const [avatar, setAvatar] = useState({
        file:null
    })
    const [image, setImage] = useState("")

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
        if(avatar.file !== null){
            const imageUrl = URL.createObjectURL(avatar)
            setImage(imageUrl)
        }
    }, [avatar])

    useEffect(() => {
        setIsLoading(true)
        fetch(`http://35.247.18.60/users/scores/${current_user.id}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
        })
        .then(r => r.json())
        .then(scores => {
            let scoresArray = [];
            let dataScores = scores;
            scores.forEach((score) => {
                scoresArray.push(parseFloat(score.score));
            })
            data.datasets[0].data = dataScores.map((value) => {
                return value.score;
            }).slice(-10)
            setHighScore(Math.max(...scoresArray))
            setIsLoading(false)
        })
    }, [])

    function handleAvatarSubmit(e){
        e.preventDefault();

        if (avatar !== null){
            const form = new FormData();
            form.append("avatar", avatar)
            fetch("http://35.247.18.60/avatar", {
            method: "post",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            body: form,
            })
            .then((res) => {
                if (res.ok) {
                document.location.reload()
                return res.json();
                } else {
                throw new Error(res);
                }
            })
        } else {
            alert("no file has been attached")
        }
    }

    console.log(data.labels)

    console.log(avatar)

    return (
        <div className="relative w-2/5 mt-14 z-20 rounded-xl justify-center mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center justify-center relative mt-6 mb-6">
                <img className="h-32 w-32 object-cover border-4 border-emerald-500" src={avatar.file !== null ? image : current_user.avatar_url ? current_user.avatar_url : "https://avatars.githubusercontent.com/u/35440139?v=4}"}/>
                    <div className="ml-4 flex flex-col h-full w-1/3">
                        <h3 className="text-emerald-500">{current_user.username} <span className="text-xs">Origin: {current_user.origin ? current_user.origin : "N/A"}</span></h3>
                        <p className="text-emerald-500 mb-1">Highscore: {highScore === -Infinity ? 0 : highScore} WPM</p>
                        <div className="relative w-full">
                                {avatar.file !== null ? <button className="w-fit bg-emerald-500 px-2 rounded-md text-sky-900 font-bold" onClick={(e) => handleAvatarSubmit(e)}>submit avatar</button> : 
                                    <>
                                        <input onChange={(e) => setAvatar(e.target.files[0])} id="file" placeholder="yes" type="file" name="avatar" className="w-fit hidden"  />
                                        <label className="text-md font-bold text-sky-900 bg-emerald-500 rounded-md px-2 py-[2.5px] hover:cursor-pointer" for="file">change your avatar</label>
                                    </>
                                }
                        </div>
                        <button onClick={() => navigate('/profile/edit')} className="bg-emerald-500 text-sky-900 px-2 rounded-md mt-2 w-fit hover:bg-emerald-300 font-bold">settings</button>
                    </div>
            </div>
            <h2 className="text-center text-lg underline underline-offset-4 italic text-emerald-500">previous ten rounds</h2>
            <div className="">
                {isLoading ? null : <Line className="p-10" data={data} options={options} />}
            </div>
        </div>
    )
}