import React from 'react';

export default function ProfileEdit({ setProfile }){
    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center relative ml-6 mt-6 mb-6 mr-6">
                <img className="h-32 w-32" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                <div className="h-fit">
                    <div className=" ml-4 flex flex-col h-full w-full">
                        <input placeholder="hello" className="my-2 w-4/5 placeholder-sky-900 indent-2 rounded-md text-sky-900 bg-emerald-500" />
                        <input placeholder="hello" className="my-2 w-4/5 placeholder-sky-900 indent-2 rounded-md text-sky-900 bg-emerald-500" />
                        <input placeholder="hello" className="my-2 w-4/5 placeholder-sky-900 indent-2 rounded-md text-sky-900 bg-emerald-500" />
                    </div>
                </div>
            </div>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">who can view your profile</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right my-3">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">highscore visible to:</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
            <div className="w-1/2 mx-auto">
                <div className="dropdown dropdown-right mt-3 mb-6">
                    <label tabIndex={0} className="btn no-animation m-1 bg-emerald-500 text-sky-900 hover:bg-emerald-300">who can view your profile</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-sky-800">
                        <li className="bg-emerald-500 border-b-[4px] border-sky-800 text-sky-900"><a>everyone</a></li>
                        <li className="bg-emerald-500 text-sky-900"><a>no one</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}