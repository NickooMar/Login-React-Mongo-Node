import React, { useContext } from 'react'
import { myContext } from './Context';

function Profile() {
    const ctx = useContext(myContext);


    return (
        <div className="text-center">
            <h4 className="display-4" style={{marginTop: "250px"}}>Your profile: {ctx.username}</h4>
        </div>
    )
}

export default Profile
