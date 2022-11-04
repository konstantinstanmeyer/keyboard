import React,{ useState } from 'react';
import ProfileEdit from './ProfileEdit';
import ProfileExists from './ProfileExists';
import ProfileSettings from './ProfileSettings';

export default function Profile({ current_user }){
    const [profile, setProfile] = useState("normal")

    if (profile == "normal"){
        return <ProfileExists setProfile={setProfile} />
    } else if (profile == "edit"){
        return <ProfileEdit setProfile={setProfile} />
    } else if (profile == "settings"){
        return <ProfileSettings setProfile={setProfile} />
    }
}