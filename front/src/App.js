import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import NavBar from './components/Navbar';
import Home from './components/Home';




function App() {
 
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    console.log('getUser');
    fetch("http://localhost:3000/getUser",{credentials: 'include'})
        .then(res => res.json())
        .then(user =>{ console.log('getUser',user); setUser(user);});
},[]);

  return (
    <>
      <NavBar user={user} setUser={setUser}/>
      

      <Home user={user} setUser={setUser}/>
    </>
  )

}

export default App;
