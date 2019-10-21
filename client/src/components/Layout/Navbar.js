import React, { Component } from "react";
import { BrowserRouter, Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">how_to_vote</i>
              Election Management System
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
