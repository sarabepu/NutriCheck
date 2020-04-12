import React, { useState, useEffect } from "react";
import { Col, Form, InputGroup, Card, Row, Button, Container } from 'react-bootstrap';

//Método para hacer post con fetch
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function Login(props) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const [nutri, setNutri] = useState(false)

  const handleSubmit=()=>{
    let paciente={username,password,nutri};
    console.log(paciente);
    postData('http://localhost:3000/login',paciente)
    .then((data)=>props.setUser(data.user));
  };

  return (

    

    <Form inline >
      
          <Form.Control type="text" placeholder="Username"  onChange={e => setUsername(e.target.value)} />
    
          <Form.Control type="password" placeholder="Password"   className=" ml-sm-2" onChange={e => setPassword(e.target.value)}/>
        
          <Form.Check type="checkbox" label=" Soy Nutricionista" className=" ml-sm-2 white-text" onChange={e => setPassword(e.target.value)}/>
        <Button  variant="primary" className=" ml-sm-2" onClick={handleSubmit}>Login
       
    </Button>
    </Form>
  );
}
export default Login;