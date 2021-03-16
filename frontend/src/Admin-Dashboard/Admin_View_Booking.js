import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import FilterUsingHotel from "./FilterBookings";
// import axios from 'axios'

// const bURL = "http://localhost:2400/bookings";
const bURL = "https://travenation-controller.herokuapp.com/bookings"
// const tdate = new Date()

class Admin_View_Booking extends Component {


  state = {
    bookingData: "",
  };




  componentDidMount() {
    // const today = `${tdate.getFullYear()}-${tdate.getMonth()+1}-${tdate.getDate()}`

    // const response = await axios.get(bURL);
    // this.setState({bookingData : response.data.filter((item)=>{
    //     return(
    //          item.checkIn <= today
    //     )
    //  })
    // })
    fetch(bURL, {
      method: "GET",
      headers: { "x-access-token": sessionStorage.getItem("login_token") },
    })
      .then((data) => data.json())

      .then((data) => {
        this.setState({ bookingData: data });
      });
  }





  handleAccept = (_id) => {
    let id = {
      _id:_id,
    };

    fetch(`https://travenation-controller.herokuapp.com/bookings/accept_booking`, {
      method: "POST",
      headers: {
        "Application-Type": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
    .then(data=>data.json())
    .then(data=>{
      if(data.auth===true){alert(`Requested Booking ID ${_id} is confirmed`);}
      else{alert("something went wrong! try again")}
    })
  };





  handleReject = (_id) => {
    let id = {
      _id:_id,
    };

    fetch(`https://travenation-controller.herokuapp.com/bookings/reject_booking`, {
      method: "POST",
      headers: {
        "Application-Type": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
    .then(data=>data.json())
    .then(data=>{
      if(data.auth===true){alert(`Requested Booking ID ${_id} is rejected`);}
      else{alert("something went wrong! try again")}
    })
  };






  renderData = (data) => {
    if (data) {
      return data.map((items) => {
        return (
          <tr key={items._id}>
            <td>{items._id}</td>
            <td>{items.hotel_name}</td>
            <td>{items.name}</td>
            <td>{items.phone}</td>
            <td>{items.checkIn}</td>
            <td>{items.checkOut}</td>
            <td>{items.status}</td>
            {items.status === "Pending" ? (
              <td>
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={() =>this.handleAccept(items._id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-outline-danger"
                  type="submit"
                  onClick={() =>
                    this.handleReject(items._id)}
                >
                  Reject
                </button>

              </td>
            ) : null}
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




  filterData(sortedData) {
    if (sortedData) {
      this.setState({
        bookingData: sortedData,
      });
    } else {
      alert("There is no booking as such");
    }
  }




  render() {
    return (
      <div style={{padding:"34px",overflow:"auto"}}>
        <h1>Booking Details</h1>
        <hr />
        {sessionStorage.getItem("role") === "admin" ? (
          <>
            <Link to="/admindashboard">
              <button style={{marginBottom:"10px",width:"150px"}} className="btn btn-outline-secondary" type="submit">
                Back
              </button>
            </Link>
            <FilterUsingHotel atHotelName={(data) => {this.filterData(data)}}/>
          </>
        ) : null}
        <hr/>
        <table id="table" className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Booking ID</th>
              <th scope="col">Hotel Name</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Check-In</th>
              <th scope="col">Check-Out</th>
              <th scope="col">Booking Status</th>
              <th scope="col">Approval</th>
            </tr>
          </thead>
          <tbody>
            {this.renderData(this.state.bookingData)}
          </tbody>

        </table>
      </div>
    );
  }
}



export default Admin_View_Booking;