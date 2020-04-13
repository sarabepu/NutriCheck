import React from "react";
import Registro from "./Registro";
import Datos from "./Datos";
import Pacientes from "./Pacientes";

function Home(props) {
  console.log(props.user);
  return (
    <div>
      {props.user == null ? (
        <>
          <Registro {...props} />
        </>
      ) : (
        <>
          {props.user.nutri ? (
            <Pacientes user={props.user}></Pacientes>
          ) : (
            <Datos user={props.user} setUser={props.setUser}></Datos>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
