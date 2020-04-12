import React, { useState, useEffect } from 'react';
import Registro from './Registro'

import Login from './Login';
import { Button } from 'react-bootstrap';

function Home(props) {



    console.log(props.user)
    return (
        <div>
            {(props.user==null)?
                <>
                <Registro {...props}/>
                </>
             : 
             <>
             <h1 className="white-text" >Perfil de  {props.user.username}</h1>
             
             </>}
        </div>
    );

}

export default Home;