import React, { useState, useEffect } from 'react';
import Registro from './Registro'

import Login from './Login';
import { Button } from 'react-bootstrap';

function Home() {

    const logout= () =>{
        fetch("http://localhost:3000/logout")
        .then(setUser(null))
    };
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('getUser');
        fetch("http://localhost:3000/getUser",{credentials: 'include'})
            .then(res => res.json())
            .then(user =>{ console.log('getUser',user);setUser(user);});
    },[]);


    console.log(user)
    return (
        <div>
            {(user==null)?
                <>
                <Login setUser={setUser}/>
                <Registro setUser={setUser}/>
                </>
             : 
             <>
             <h1>Welcome {user.username}</h1>
             <Button onClick={logout}>Logout</Button>
             </>}
        </div>
    );

}

export default Home;