import React from 'react';

export default function ProfileSettings({ setProfile }){
    return(
        <div className="relative w-1/4 mt-14 z-20 rounded-xl mx-auto flex flex-col h-fit bg-sky-900">
            <div className="flex flex-row items-center relative ml-6 mt-6 mb-6 mr-6">
                <img className="h-32 w-32" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                <div className="h-fit">
                    <div className=" ml-4 flex flex-col h-full w-full">
                        <h3 className="pt-3 text-emerald-500">Username <span className="text-xs">place of origin</span></h3>
                        <p className="text-emerald-500 mt-2">highscore</p>
                        <button className="bg-emerald-500 text-sky-900 mt-5 rounded-md w-full hover:bg-emerald-300">edit settings</button>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-xl italic text-emerald-500">Preferences:</h2>
            <p className="text-center text-emerald-500 my-5 font-bold">origin visible?<span className="text-emerald-500 mx-5 font-normal">Yes</span></p>

            <p className="text-center text-emerald-500 my-5 font-bold">private highscore?<span className="text-emerald-500 mx-5 font-normal">No</span></p>

            <p className="text-center text-emerald-500 my-5 font-bold">Origin visible?<span className="text-emerald-500 mx-5 font-normal">Yes</span></p>

            <p className="text-center text-emerald-500 my-5 pb-2 font-bold">Origin visible?<span className="text-emerald-500 mx-5 font-normal">Yes</span></p>  
        </div>
    )
}