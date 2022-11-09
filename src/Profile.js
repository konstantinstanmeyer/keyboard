import React,{ useEffect, useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileExists from './ProfileExists';
import ProfileSettings from './ProfileSettings';
import ProfileGuest from './ProfileGuest';

export default function Profile({ current_user }){
    const [profile, setProfile] = useState("")
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3000/users/current', {
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

    console.log(user)

    if (profile == "normal"){
        return <ProfileExists current_user={user} setProfile={setProfile} />
    } else if (profile == "guest"){
        return <ProfileGuest current_user={user} setProfile={setProfile} />
    }
}