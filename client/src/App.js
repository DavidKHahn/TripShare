import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import View from "./components/View";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/view" component={View} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
