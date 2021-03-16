import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

// const logURL=" http://localhost:2400/api/auth/login";
const logURL = "https://travenation-controller.herokuapp.com/api/auth/login";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    loader: false,
    error: "",
  };
  handler = (event) => {
    let data = event.target.value;
    let state_name = event.target.name;
    this.setState({
      [state_name]: data,
    });
  };

  submit_form = () => {
    if (this.state.email && this.state.password) {
      this.setState({ loader: true });
      fetch(logURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.auth === false) {
            this.setState({ error: data.error });
          }
          if (data.auth === true) {
            sessionStorage.setItem("login_token", data.token);
            this.props.history.push("/");
          }
          this.setState({ loader: false });
        });
    } else {
      alert("please provide your details");
    }
  };

  render() {
    return (
      <div className="justify-content-md-center" style={{padding:"34px"}}>
      <div
        className="col-md-8"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        <div className="login-input" onChange={this.handler}>
          <h2>LogIn</h2>
          <hr />
          <p style={{ color: "red" }}>{this.state.error}</p>
          <i>
            <h5>E-mail</h5>
          </i>{" "}
          <input
            id="input-mail"
            className="form-control"
            name="email"
            type="email"
            placeholder="e-mail"
          />
          <br/>
          <i>
            <h5>Passcode</h5>
          </i>{" "}
          <input
            id="input-password"
            className="form-control"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>

        <br/>
        <div>

          {!this.state.loader && (
            <button
              style={{ width:"150px" }}
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
                style={{ width:"150px" }}
              className="btn btn-secondary"
              type="submit"
              onClick={this.submit_form}
              disabled
            >
              <i className="fa fa-refresh fa-spin"></i> Logging...
            </button>
          )}
          <p>
            Not Registered? <Link to="/signup">SignUp</Link>{" "}
          </p>
        </div>
      </div>
      </div>
    );
  }
}
export default LogIn;
