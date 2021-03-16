import React, {Component} from 'react';

// const bURL = "http://localhost:2400/bookings"
const bURL = "https://travenation-controller.herokuapp.com/bookings"


class FilterBookings extends Component{
    state={
        booking_data:"",
        hotel_name:"",
        booking_date : ""
    }
    

    componentDidMount(){
      
        fetch(bURL, {
            method: "GET",
            headers: { "x-access-token": sessionStorage.getItem("login_token") },
        })
        .then((data) => data.json())
    
        .then((data) => {

            this.setState({booking_data:data})
        });
    }


    renderHotel=(data)=>{
        if(data){
            return data.map((items)=>{
                return(
                    <option key={items._id}>
                        {items.hotel_name} 
                    </option>
                )
            })
        }
    }


    hotelHandler=(event)=>{
       
        this.setState({
            hotel_name: event.target.value
        })
    }


    dateHandler=(event)=>{
        
        this.setState({
            booking_date:event.target.value
        })
    }


    hotelSearchHandler=()=>{
        
        if(this.state.hotel_name){

            let data = this.state.booking_data.filter((item)=>{
                return item.hotel_name === this.state.hotel_name
            })
          
            this.props.atHotelName(data)
        } 
        else{
            alert("oops! Seems like no booking placed on selected hotel")
        }
    }


    dateSearchHandler=()=>{
        if(this.state.booking_date){
            let data = this.state.booking_data.filter((item)=>{
                return item.checkIn >= this.state.booking_date
            })
            
            this.props.atHotelName(data)
        }
        else{
            alert("oops! Seems like no booking placed on selected date")
        }
    }


    render(){
        return(
           
                <div className="row">


                    <div className="col-md-7">
                        <div className="row">

                            <h5 className="col-md-3"><i>Search Hotel</i></h5>

                            <select className="col-md-5" onChange={this.hotelHandler} type="text">
                                <option>--Select Hotel--</option>
                                {this.renderHotel(this.state.booking_data)}
                            </select>

                            <div className="col-md-4">
                                <button className="btn btn-outline-success" onClick={this.hotelSearchHandler}>Hotel Search</button>
                            </div>

                        </div>
                        
                    </div>


                    <div className="col-md-5">
                        
                        <div className="row">

                            <h5 className="col-md-3"><i>Search Date</i></h5>

                            <div className="col-md-5">
                                <input onChange={this.dateHandler} type="date"/>
                            </div>

                            <div className="col-md-4">
                                <button className="btn btn-outline-success" onClick={this.dateSearchHandler}>Search</button>
                            </div>

                        </div>
                    </div>


                </div>
                
                
         
        )
    }

}

export default FilterBookings;