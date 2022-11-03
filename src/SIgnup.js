import React from 'react';

export default function Signup(){
    reutrn (
        <div className="h-fit w-1/4 bg-sky-900 mx-auto rounded-md relative mt-14">
            <div className="py-10">
            <img className="h-24 w-24 m-auto mb-5" src="https://cdn-icons-png.flaticon.com/512/2648/2648647.png"/>
            <h5 className="text-emerald-500 text-center text-xl pb-5 mx-5"><strong>Enter Valid Login Credentials:</strong></h5>
            <form onSubmit={handleSubmit} className="relative flex flex-col justify-center">
                <div className="relative flex justify-center pb-3">
                    <input className="h-10 w-2/3 border-4 rounded-md border-emerald-500 placeholder-sky-900 bg-emerald-500 text-sky-900 m-auto indent-3 py-5 my-3" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..."/>
                </div>
                <div className="relative flex justify-center">
                {!emailRegex.test(email) && startedTyping ? <p className="text-sm absolute -top-4 text-red-500 p-0 m-0">*please enter a valid email*</p> : null}
                </div>
                <input className="h-10 w-2/3 border-4 border-emerald-500 text-sky-900 rounded-md m-auto indent-3 py-5 my-2 placeholder-sky-900 bg-emerald-500" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." type={closed ? "password" : "text"}/>
                <img onClick={() => setClosed(!closed)} className="h-6 w-6 relative ml-auto -top-11 right-[20%]" src={closed ? "https://cdn-icons-png.flaticon.com/512/2356/2356734.png" : "https://cdn-icons-png.flaticon.com/512/709/709612.png"}/>
                <button id="submit-button" className="rounded-md h-20 w-2/3 bg-emerald-500 m-auto text-2xl text-sky-900">Sign In</button>
            </form>
            <p className="text-center text-emerald-500 mt-1 hover:cursor-pointer">Don't have an account? <i>Sign up!</i></p>
            </div>
        </div>
    )
}