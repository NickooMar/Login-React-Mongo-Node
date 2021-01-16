import React, {useContext} from 'react'
import { myContext } from './Context'

export default function Homepage() {
    const ctx = useContext(myContext);
    console.log(ctx)
    return (
        <div className="text-center">
            <h4 className="display-4" style={{marginTop: "250px"}}>Welcome to the Homepage</h4>
        </div>
    )
}

