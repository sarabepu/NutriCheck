import React from "react";
import Preferencias from "./Preferencias";

function Datos(props) {
  return (
    <Preferencias user={props.user} setUser={props.setUser}></Preferencias>
  );
}

export default Preferencias;
