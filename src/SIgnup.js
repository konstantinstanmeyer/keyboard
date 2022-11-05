import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [closed, setClosed] = useState(true)
    const [startedTyping, setStartedTyping] = useState(false)
    const navigate = useNavigate();
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    function handleSubmit(e){
        e.preventDefault();
        if(emailRegex.test(email)){
            fetch("http://localhost:3000/signup", {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            user: {
                email: email,
                password: password,
            },
            }),
            })
            .then((res) => {
            if (res.ok) {
                console.log(res.headers.get("Authorization"));
                localStorage.setItem("token", res.headers.get("Authorization"));
                return res.json();
            } else {
                throw new Error(res);
            }
            })
            .then((json) => console.dir(json))
            .catch((err) => console.error(err))
        } else {
            alert("Please enter a valid email")
        }
    }

    useEffect(() => {
        if (startedTyping == false && email.length > 0){
            setStartedTyping(true);
        }
    }, [email])

    return (
        <div className="h-fit w-1/4 bg-sky-900 mx-auto rounded-md relative mt-14">
            <div className="py-10">
                <img className="h-24 w-24 m-auto mb-5" src="https://cdn-icons-png.flaticon.com/512/4116/4116368.png"/>
                <h5 className="text-emerald-500 text-center text-xl pb-5 mx-5"><strong>Sign up</strong></h5>
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
            </div>
        </div>
    )
}