import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Layout/Navbar.js";
import Landing from "./components/Layout/Landing.js";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    response: "",
    get: "",
    responseToGet: ""
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
