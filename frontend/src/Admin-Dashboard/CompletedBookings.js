import React from 'react' ;
// import axios from 'axios' ;
import {Link} from 'react-router-dom'
import { Spinner } from "react-bootstrap";

// const bURL = "http://localhost:2400/bookings"
const bURL = "https://travenation-controller.herokuapp.com/bookings"
const tdate = new Date()

class CompletedBookings extends React.Component{
    state = {
        bookingData : '',
        filterData : ''
    }


    async componentDidMount(){
        const today = `${tdate.getFullYear()}-${tdate.getMonth()+1}-${tdate.getDate()}`
        fetch(bURL, {
            method: "GET",
            headers: { "x-access-token": sessionStorage.getItem("login_token") },
          })
            .then((data) => data.json())
      
            .then((data) => {
              this.setState({ bookingData: data.filter((item)=>{
                  return item.checkIn < today
              }) });
            });
    }

    
    filtering=(data)=>{
        if(data){
        return data.map((items)=>{
            return(
              <tr key={items._id}>
                <td>{items._id}</td>
                <td>{items.hotel_name}</td>
                <td>{items.name}</td>
                <td>{items.phone}</td>
                <td>{items.checkIn}</td>
                <td>{items.checkOut}</td>
                <td>Completed</td>
              </tr>
            )
        })
      }
      else {
        return (
        <tr>
          <td><Spinner animation="border" role="status"></Spinner></td>
        </tr>
        )
      }
    }

    render(){
        return(
            <div style={{overflow:"auto",padding:"34px"}}>
                <h1>Completed Bookings</h1>
                <hr/>
                {sessionStorage.getItem('role')==='admin'?
               
                <Link to="/admindashboard"><button style={{marginBottom:"10px",width:"150px"}} className="btn btn-outline-secondary" type="submit">Back</button></Link>
                :
                null
                }
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Hotel Name</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Check-In</th>
                        <th scope="col">Check-Out</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.filtering(this.state.bookingData)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CompletedBookings;