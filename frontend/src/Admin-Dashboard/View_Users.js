import React from "react";
import { Component } from "react";
import {Link} from 'react-router-dom'
import { Spinner } from "react-bootstrap";

// const profileURL = "http://localhost:2400/api/auth/users"
const profileURL = "https://travenation-controller.herokuapp.com/api/auth/users"

class View_Users extends Component{
  constructor(props){
    super(props)

    this.state={
        users : ""
    }
  }
  componentDidMount(){
    fetch((profileURL),{method:'GET'})
    .then((res)=>res.json())
    .then((data)=>{this.setState({users:data})})
  }
  
  renderUserDetails = (userData) => {
    // console.log("user details", userData);
    if (userData) {
      return userData.map((item) => {
        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.role}</td>
          </tr>
        );
      });
    }
    else {
      return (
      <tr>
        <td><Spinner animation="border" role="status"></Spinner></td>
      </tr>
      )
    }
  };
  render(){
  return (
    <div style={{overflow:"auto", padding:"34px"}}>
      <h1>List Of Users</h1>
      <hr/>
        <Link to="/admindashboard"><button style={{marginBottom:"10px", width:"150px"}} className="btn btn-outline-secondary" type="submit">Back</button></Link>
        <div>
            
        </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{this.renderUserDetails(this.state.users)}</tbody>
      </table>
    </div>
  );
  }
};
export default View_Users;
