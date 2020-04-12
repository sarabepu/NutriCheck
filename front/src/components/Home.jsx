import React from 'react';
import Registro from './Registro'


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