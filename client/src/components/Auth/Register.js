import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      roles: [],
      constituency: [],
      address: "",
      voting_status: null,
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    let initialRoles = [];
    let initialConstituencies = [];
    fetch("/roles")
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(
        function(data) {
          // console.log("Data -" + data);
          initialRoles = data;
          console.log(initialRoles);
          for (let i = 0; i < data.length; i++) {
            initialRoles[i] = data[i].role_name;
          }
          this.setState({
            roles: initialRoles
          });
          console.log(this.state.roles + " roles");
        }.bind(this)
      );
  }

  onSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.state.id,
      name: this.state.name,
      roles: this.state.roles,
      constituency: this.state.constituency,
      address: this.state.address,
      voting_status: this.state.voting_status
    };
    console.log(data);
    fetch("/voters/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad Response From Server");
        }
        if (response.status === 200) {
          this.setState({
            message:
              "Thanks for Registering!!! Kindly revisit in sometime to check your status"
          });
        }
      }.bind(this))
      .then(function(data) {
        console.log(data + "Data Success");
        if (data === "success") {
          this.setState({
            message:
              "Thanks for Registering!!! Kindly revisit in sometime to check your status"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  render() {
    // const { voting_status } = this.state;
    let roles = this.state.roles;
    // let roleOptions = roles.map(role => <option key={role}>{role}</option>);
    return (
      <div className="container">
        <h1>{this.state.message}</h1>
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
                {/* <select value={this.state.roles}>
                  <option value="voter">Voter</option>
                  <option defaultValue="candidate">Candidate</option>
                </select> */}
                <input onChange={this.onChange} id="roles" type="text" />
                <label htmlFor="roles">Roles</label>
              </div>
              <div className="input-field col s9">
                {/* <select>{roleOptions}</select>
                <select>
                  <option>Vellore</option>
                  <option>Chennai</option>
                </select> */}
                <input onChange={this.onChange} id="constituency" type="text" />
                <label htmlFor="constituency">Constituency</label>
              </div>
              <div className="input-field col s9">
                <input onChange={this.onChange} id="address" type="text" />
                <label htmlFor="address">Address</label>
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
