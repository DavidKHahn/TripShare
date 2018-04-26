import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import Login from "./components/Login";





class App extends React.Component {



  render() {
    return (
      <div className="App">
        <Login />
        {/* <Create /> */}
      </div>
    );
  }
}

export default App;
