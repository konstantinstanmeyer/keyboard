import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
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

export default function ProfileExists({ setProfile, current_user }){
    const navigate = useNavigate();

    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl justify-center mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center relative ml-6 mt-6 mb-6 mr-6">
                <img className="h-32 w-32" src={current_user.avatar_url ? current_user.avatar_url : "https://cdn-icons-png.flaticon.com/512/2458/2458293.png"}/>
                <div className="h-fit">
                    <div className=" ml-4 flex flex-col h-full w-3/4">
                        <h3 className="pt-3 text-emerald-500">{current_user.email} <span className="text-xs">place of origin</span></h3>
                        <p className="text-emerald-500 mt-2">high_score: {current_user.id}</p>
                        <button onClick={() => navigate('/profile/edit')} className="bg-emerald-500 text-sky-900 mt-5 rounded-md w-full hover:bg-emerald-300">edit settings</button>
                    </div>
                </div>
            </div>

        </div>
    )
}