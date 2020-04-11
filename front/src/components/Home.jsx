import React, { useState, useEffect } from 'react';
import Registro from './Registro'

import Login from './Login';
function Home() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('getUser');
        fetch("/getUser")
            .then(res => res.json())
            .then(user =>{ console.log('getUser',user);setUser(user);});
    },[]);

    return (
        <div>
            {!user ?
                <Login setUser={setUser}/> : <div>Welcome {user.userName}</div>
            }
            <div id="background">
                <Registro />
            </div>
        </div>
    );

}

export default Home;