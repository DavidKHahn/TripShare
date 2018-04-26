import React, { Component } from "react";
import "./App.css";
import Create from "./components/Create";
import FormModal from "./components/FormModal";
import NavBar from "./components/NavBar"




class App extends React.Component {



  render() {
    return (
      <div className="App">
        <Create />
        {/* <FormModal /> */}
      </div>
    );
  }
}

export default App;
