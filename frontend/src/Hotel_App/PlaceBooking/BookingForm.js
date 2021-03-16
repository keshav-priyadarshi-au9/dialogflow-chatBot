import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// const bURL = "  http://localhost:2400/bookings/generate_booking"
const bURL = "https://travenation-controller.herokuapp.com/bookings/generate_booking"


class BookingForm extends Component{
    constructor(props){
        super(props)

        this.state={
            hotel_name : sessionStorage.getItem('hotel_name'),
            name : "",
            email : "",
            phone : "",
            checkIn : "",
            checkOut : "",
            status : "Pending",
            payment:""
        }
    }

    componentDidMount(){
        this.setState({email : sessionStorage.getItem('email')})
    }

    handleChangeName=(event)=>{
        this.setState({
            name : event.target.value
        })
    }
    handleChangePhone=(event)=>{
        this.setState({
        phone : event.target.value
        })
       
    }
    handleChangeCheckIn=(event)=>{
        this.setState({
            checkIn : event.target.value
        })
    }
    handleChangeCheckOut=(event)=>{
        this.setState({
            checkOut : event.target.value
        })
    }

    handleChangePayment=(event)=>{
        this.setState({
            payment:event.target.value

        })
    }
    submitData=()=>{
        console.log(this.state)
        if(this.state.name &&
            this.state.email &&
            this.state.phone &&
            this.state.checkIn &&
            this.state.checkOut&&
            this.state.status&&
            this.state.payment){
                let bookingData = {
                    hotel_name : this.state.hotel_name,
                    name : this.state.name,
                    email : this.state.email,
                    phone : this.state.phone,
                    checkIn : this.state.checkIn,
                    checkOut : this.state.checkOut,
                    status : this.state.status,
                }
        
                if(this.state.phone.length===10){
                    fetch(bURL,{
                        method:'POST',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json',
                            'x-access-token': sessionStorage.getItem('login_token')
                        },
                        body:JSON.stringify(bookingData)
                    })
                    .then(data=>data.json())
                    .then(alert('Thanks for Choosing Us. Your booking has been placed'))
                    this.props.history.push('/viewbookings')
                }
                else{
                    alert("Please provide correct phone no.")
                }
        }
        else{
            alert("fill all the details")
        }
    }
    
    render(){
        const tripID = sessionStorage.getItem('tripid')
        return(
            <div className="row justify-content-md-center" style={{padding:"34px"}}>
            <div className="col-md-8" style={{marginBottom:"50px"}}>

                <div className="form-group">

                    <h1>Place Booking</h1><hr/>

                    <div className="form-group">
                        
                        <h5><i>Hotel Name</i></h5>
                        <input className="form-control" name="hotel_name" type="text" readOnly value={this.state.hotel_name}/>
                        <br/>

                        <h5><i>Name</i></h5>
                        <input className="form-control" name="name" type="text" onChange={this.handleChangeName}/>
                        <br/>

                        <h5><i>Phone no.</i></h5>
                        <input className="form-control" name="phone" type="number" onChange={this.handleChangePhone}/>
                        <br/>

                        <h5><i>Check-In Date</i></h5>
                        <input className="form-control" name="checkIn" type ="date" onChange={this.handleChangeCheckIn}/>
                        <br/>

                        <h5><i>Check-Out Date</i></h5>
                        <input className="form-control" name="checkOut" type ="date" onChange={this.handleChangeCheckOut}/> 
                        <br/>

                        <h5><i>Payment</i></h5>
                        <input name="payment" type ="radio" value="Pay at hotel" onChange={this.handleChangePayment}/>
                        Pay at hotel
                    </div>
                    
                    <button style={{width:"150px", marginTop:"20px", marginBottom:"20px"}} className="btn btn-outline-success" type="submit" onClick={this.submitData} value="Submit">Submit</button>
                   
                    <br/>

                    <div className="row">
                        
                        <div className="col-md-6">

                            <Link  className="col-md-6" to={`/details/${tripID}`}><button style={{width:"150px"}} className="btn btn-outline-secondary" type="submit">Back</button></Link>

                            <Link  className="col-md-6" to={`/list/${tripID}`}><button style={{width:"150px"}} className="btn btn-outline-warning" type="submit">Book Another</button></Link>

                        </div>

                    </div>

                </div>
    
            </div>
            </div>
        )
    }
}

export default BookingForm;