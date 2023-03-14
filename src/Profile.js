import React,{ useEffect, useState } from 'react';
import ProfileExists from './ProfileExists';
import ProfileGuest from './ProfileGuest';

export default function Profile({ current_user }){
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch('http://35.247.18.60/users/current', {
        headers: {
            Authorization: localStorage.getItem("token")
        }
        })
        .then(r => r.json())
        .then(r => {
            if (r.hasOwnProperty('email')){
                setUser(r)
                setProfile("normal")
                console.log(r)
            } else {
                setProfile("guest")
            }
        })
    }, [])

    if (profile == "normal"){
        return <ProfileExists current_user={user} setProfile={setProfile} />
    } else if (profile == "guest"){
        return <ProfileGuest current_user={user} setProfile={setProfile} />
    }
}