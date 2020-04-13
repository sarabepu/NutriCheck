import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("getUser");
    fetch("http://localhost:3000/getUser", { credentials: "include" })
      .then((res) => res.json())
      .then((user) => {
        console.log("getUser", user);
        setUser(user);
      });
  }, []);

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/progreso">
          <Dashboard user={user} setUser={setUser}></Dashboard>
        </Route>
        <Route path="/">
          <Home user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
