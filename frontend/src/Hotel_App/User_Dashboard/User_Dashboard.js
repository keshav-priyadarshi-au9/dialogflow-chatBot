import React from 'react';
import { Component } from 'react';
import {Link} from 'react-router-dom'
import profile from '../images/profilePic.png'

// const userinfo_URL = "http://localhost:2400/api/auth/userInfo"
const userinfo_URL = "https://travenation-controller.herokuapp.com/api/auth/userInfo"

class User_Profile extends Component{
    constructor(props){
        super(props)

        this.state={
            user:"",
            error:""
        }
    }


    componentDidMount(){
        fetch((userinfo_URL),{method:'GET',
        headers:{'x-access-token': sessionStorage.getItem('login_token')},
    })
        .then((res)=>res.json())
        .then((data)=>{
            this.setState({user:data})
            sessionStorage.setItem("email",data.email)
        })
    } 



    render(){
        sessionStorage.setItem('role',this.state.user.role)
        return(
            <div className="row" style={{padding:"34px"}}>
                <div className="col-md-3">
                    <img style={{width:"90%"}} src={profile} alt="profilepic"/>
                    
                    <div style={{marginTop:"20px"}}>
                        <h4>{this.state.user.name}</h4>
                        <h6>{this.state.user.role}</h6>
                    </div>

                </div>
                <div className="col-md-9">
                    <h4>Information</h4>
                    <hr/>
                    
                    <h5><i>Name</i></h5> 
                    <h6>{this.state.user.name}</h6>
                
                    <h5><i>E-mail</i></h5>
                    <h6>{this.state.user.email}</h6>

                    <br/> 

                    <h4>Position</h4>
                    <hr/>
                    <h5><i>Role</i></h5>
                    <h6>{this.state.user.role}</h6>
                   
                    <br/>

                    <h4>Bookings</h4>
                    <hr/>
                    <div className="view-button">
                        {sessionStorage.getItem('role')==='admin'?
                    
                        <Link to="/admindashboard">
                            <button className="btn btn-outline-success" type="submit" >Admin Dashboard</button>
                        </Link>
                        :
                        <Link to="/viewbookings">
                            <button className="btn btn-outline-secondary" type="submit">Your Bookings</button>
                        </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
  
}

export default User_Profile;