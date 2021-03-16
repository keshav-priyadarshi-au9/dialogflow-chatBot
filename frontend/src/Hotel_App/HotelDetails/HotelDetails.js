import React, { Component } from 'react';
import DetailDisplay from './DetailDisplay';

const DetailsUrl = "https://developerfunnel.herokuapp.com/hotelsdetails/"

class HotelDetails extends Component {
    constructor(props){
        super(props)

        this.state = {
            hotel_details : "",
        }
    }
    componentDidMount(){
        const paramId = this.props.match.params.id
        fetch(`${DetailsUrl}${paramId}`,{method:'GET'})
        .then((res)=>res.json())
        .then((data)=>{
            this.setState({
                hotel_details : data[0]
            })
            // console.log("hotel name",this.state.hotel_details.name[0].name)
        })
    }
    render(){
        sessionStorage.setItem('hotel_name',this.state.hotel_details.name)
        console.log(this.props.match.params.id)
        // console.log(this.state.hotel_details)
        return(
            <div className="justify-content-md-center" style={{padding:"34px"}}>
                <h1>Hotel Details</h1>
                <hr/>
                <DetailDisplay details_data = {this.state.hotel_details}/>
            </div>
        )

    }
}
export default HotelDetails;