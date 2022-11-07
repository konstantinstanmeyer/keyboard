import React,{ useEffect, useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileExists from './ProfileExists';
import ProfileSettings from './ProfileSettings';
import ProfileGuest from './ProfileGuest';

export default function Profile({ current_user }){
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/users/current', {
        headers: {
            Authorization: localStorage.getItem("token")
        }
        })
        .then(r => r.json())
        .then(data => {
            setUser(data)
        })
    }, [])

    console.log(user)

    useEffect(() => {
        if (current_user){
            setProfile("normal")
        } else {
            setProfile("guest")
        }
    }, [])

    if (profile == "normal"){
        return <ProfileExists current_user={user} setProfile={setProfile} />
    } else if (profile == "edit"){
        return <ProfileEdit current_user={user} setProfile={setProfile} />
    } else if (profile == "settings"){
        return <ProfileSettings current_user={user} setProfile={setProfile} />
    } else if (profile == "guest"){
        return <ProfileGuest current_user={user} setProfile={setProfile} />
    }
}