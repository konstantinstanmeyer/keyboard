import React,{ useEffect, useState } from 'react';
import ProfileExists from './ProfileExists';
import ProfileGuest from './ProfileGuest';

export default function Profile({ current_user }){
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        if (current_user.hasOwnProperty('email')){
            // setUser(current_user)
            setProfile("normal")
            // console.log(r)
        } else {
            setProfile("guest")
        }
    }, [])

    if (profile == "normal"){
        return <ProfileExists current_user={current_user} setProfile={setProfile} />
    } else if (profile == "guest"){
        return <ProfileGuest current_user={current_user} setProfile={setProfile} />
    }
}