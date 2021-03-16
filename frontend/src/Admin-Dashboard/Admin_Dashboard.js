import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';


class Admin_Dashboard extends Component{

    render(){
        if(sessionStorage.getItem('login_token')==null){
            this.props.history.push('/login')
        }
        else if(sessionStorage.getItem('login_token')!==null && sessionStorage.getItem('role')!=='admin'){
            alert("Sorry!! Only admin user can access user details.")
            this.props.history.push('/dashboard')
        }
        return(
            <div className="col-md-8" style={{height:"80vh",padding:"34px"}}>
                <div className="adminDashboard">
                    <h1>Welcome to Admin Dashboard</h1>
                    <hr/>
                </div>
                <div>
                    <Link to="/viewusers">
                        <button style={{marginTop:"10px", width:"200px"}} className="btn btn-outline-danger" type="submit" onClick={this.registerUser}>View Registered Users</button>
                    </Link>
                    <br/>
                    <Link to="/adminviewbookings">
                        <button style={{marginTop:"10px",width:"200px"}} className="btn btn-outline-danger" type="submit" onClick={this.registerUser}>All Bookings</button>
                    </Link>
                    <br/>
                    <Link to="/completedbooking">
                        <button style={{marginTop:"10px",width:"200px"}} className="btn btn-outline-danger" type="submit" onClick={this.registerUser}>Completed Bookings</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Admin_Dashboard;