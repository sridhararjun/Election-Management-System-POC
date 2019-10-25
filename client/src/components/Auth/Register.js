import React, { Component } from "react";
import { Link } from "react-router-dom";
let initialRoles = [];
let initialConstituencies = [];
let roleListLegacy;
let constituencyListLegacy;
class Register extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      roles: null,
      constituency: null,
      address: "",
      password: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    fetch("/roles")
      .then(function(response) {
        return response.json();
      })
      .then(
        function(data) {
          roleListLegacy = data;
          for (let i = 0; i < data.length; i++) {
            initialRoles[i] = data[i].role_name;
          }
          this.setState({
            roles: initialRoles
          });
        }.bind(this)
      );
    fetch("/constituency")
      .then(function(response) {
        return response.json();
      })
      .then(
        function(data) {
          constituencyListLegacy = data;
          for (let i = 0; i < data.length; i++) {
            initialConstituencies[i] = data[i].constituency_name;
          }
          this.setState({
            constituency: initialConstituencies
          });
        }.bind(this)
      );
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("On Submit");
    const data = {
      id: this.state.id,
      name: this.state.name,
      roles: this.state.roles,
      constituency_id: this.state.constituency,
      address: this.state.address,
      password: this.state.password
    };
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(
        function(response) {
          console.log(response);
          console.log(response.status);
          if (response.status >= 400) {
            throw new Error("Bad Response From Server");
          }
          if (response.status === 200) {
            console.log(response.status);
            this.setState({
              message:
                "Thanks for Registering!!! Kindly revisit in sometime to check your status"
            });
            alert(this.state.message);
          }
        }.bind(this)
      )
      .then(function(data) {})
      .catch(function(err) {
        console.log(err);
      });
  }

  onChange(event) {
    if (event.target.id == "roles" || event.target.id == "constituency") {
      let index = event.target.selectedIndex;
      if (event.target.id == "roles") {
        let roleId = roleListLegacy[index].id;
        this.setState({ roles: roleId });
      }
      if (event.target.id == "constituency") {
        let constituencyId = constituencyListLegacy[index].id;
        this.setState({ constituency: constituencyId });
      }
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  }
  render() {
    let roleOptions = initialRoles.map(role => (
      <option key={role}>{role}</option>
    ));

    let constituencyOptions = initialConstituencies.map(constituency => (
      <option key={constituency}>{constituency}</option>
    ));
    return (
      <div className="container">
        <h1>{this.state.message}</h1>
        {/* <p>{this.state.roles}</p>; */}
        {/* <p>{this.state.id}</p>
        <br />
        <p>{this.state.name}</p>
        <br />
        <p>{this.state.constituency}</p>
        <br />
        <p>{this.state.roles}</p>
        <br />
        <p>{this.state.address}</p>
        <br /> */}
        <div className="row">
          <div className="col s-8 offset-s2">
            <Link to="/" className="btn-flat btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit.bind(this)} method="POST">
              <div className="input-field col s9">
                <input onChange={this.onChange} id="id" type="text" />
                <label htmlFor="voterId">Voter ID</label>
              </div>
              <div className="input-field col s9">
                <input onChange={this.onChange} id="name" type="text" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s9">
                <select
                  className="browser-default"
                  onChange={this.onChange}
                  id="roles"
                >
                  {roleOptions}
                </select>
              </div>
              <div className="input-field col s9">
                <select
                  className="browser-default"
                  id="constituency"
                  onChange={this.onChange}
                >
                  {constituencyOptions}
                </select>
              </div>
              <div className="input-field col s9">
                <input onChange={this.onChange} id="address" type="text" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="input-field col s9">
                <input onChange={this.onChange} id="password" type="text" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
