import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

// const regURL = "http://localhost:2400/api/auth/register";
const regURL = "https://travenation-controller.herokuapp.com/api/auth/register"

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    role: "",
    loader: false,
    success: "",
    error: "",
  };

  handler = (event) => {
    let data = event.target.value;
    let state_name = event.target.name;
    this.setState({
      [state_name]: data,
    });
  };

  submit_form = (e) => {
    e.preventDefault();
    this.setState({ loader: true });
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    if (this.state.email && this.state.name && this.state.password) {
      // console.log(this.state)
      fetch(regURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.auth === true) {
            this.setState({ success: data.success });
            this.setState({ error: "" });
          }
          if (data.auth === false) {
            this.setState({ error: data.error });
            this.setState({ success: "" });
          }
          this.setState({ loader: false });
        });
    } else {
        this.setState({ loader: false });
        alert("please fill all input details");
    }
  };

  render() {
    return (
      <div className="justify-content-md-center" style={{padding:"34px"}}>
      <div
        className="col-md-8"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <div className="signup-input" onChange={this.handler}>
          <h2>SignUp</h2>
          <hr />
          <p style={{ color: "red" }}>{this.state.error}</p>
          <p style={{ color: "green" }}>{this.state.success}</p>
          <i>
            <h5>Enter your name</h5>
          </i>
          <input
            className="form-control"
            name="name"
            type="text"
            placeholder="fullname"
          />
          <br />

          <i>
            <h5>Enter your E-mail</h5>
          </i>
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="e-mail"
          />
          <br />

          <i>
            <h5>Enter your Password</h5>
          </i>
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="password"
          />
          <br />
        </div>

        <div>
          {!this.state.loader && (
            <button
              style={{ width: "150px" }}
              className="btn btn-outline-secondary"
              type="submit"
              onClick={this.submit_form}
            >
              {" "}
              Submit
            </button>
          )}
          {this.state.loader && (
            <button
              style={{ width: "150px" }}
              className="btn btn-secondary"
              type="submit"
              onClick={this.submit_form}
              disabled
            >
              <i className="fa fa-refresh fa-spin"></i> Registering...
            </button>
          )}
          {/* <button style={{width:"150px"}} className="btn btn-outline-secondary" type="submit" onClick={this.submit_form}>Submit</button> */}
          <p>
            Already a user? <Link to="/login">LogIn</Link>{" "}
          </p>
        </div>
      </div>
      </div>
    );
  }
}

export default SignUp;
