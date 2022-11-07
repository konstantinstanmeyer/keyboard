import React from 'react';

export default function Info(){
    return(
        <div className="w-1/3 h-1/4 mx-auto mt-16 relative">
            <p className="w-full text-center text-lg text-sky-900">As a user, you are able to record your typing speeds against different assortments of parapgraphs, across several categories of your choice. You can then permanently save these scores upon signup, where a unique account will be generated with a specific user's information</p>
            <div className="h-28 w-2/3 mt-8 mx-auto flex items-center">
                <a target="_blank" href="https://github.com/konstantinstanmeyer">
                    <img alt="github" src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" className="w-[100px] h-[83px] ml-2"/>
                </a>
                <a target="_blank" className="ml-auto" href="https://www.linkedin.com/in/konstantin-stanmeyer/">
                    <img  alt="linkedin" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" className="h-[73px] w-[73px] mr-5" />
                </a>
            </div>
        </div>
    )
}