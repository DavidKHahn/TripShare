import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import Login from "./components/Login";
import Nav_Bar from "./components/NavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";





class App extends React.Component {



  render() {
    return (
      <Router>
        <div className="App">
          <Nav_Bar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/create" component={Create} />
            {/* <Login /> */}
            {/* <Create /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
