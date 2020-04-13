import React from 'react';
import Registro from './Registro';
import Medidas from "./Medidas";


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
             <Medidas user={props.user}/>
             </>}
        </div>
    );

}

export default Home;