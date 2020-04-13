import React from "react";
import Registro from "./Registro";
import Datos from "./Datos";


function Home(props) {
  console.log(props.user);
  return (
    <div>
      {props.user == null ? (
        <>
          <Registro {...props} />
        </>
        )
        :
        (
          <>
            <h1 className="white-text user-title" align="center">
              Perfil de {props.user.username}
            </h1>
            {props.user.nutri || (
              
              <Datos user={props.user} setUser={props.setUser}></Datos>
             
            
            )}
          </>
        )}
    </div>
  );
}

export default Home;
