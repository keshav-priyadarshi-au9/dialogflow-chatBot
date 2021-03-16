import React, { Component } from 'react'
import CostFilter from '../Filters/CostFilter';
import TripDisplay from './TripDisplay';

const urltriptype = "https://developerfunnel.herokuapp.com/hotellist/"

class TripType extends Component {
    constructor(props){
        super(props)

        this.state = {
            tripType_result : ""
        }
    }

    componentDidMount(){     
        var tripid = this.props.match.params.id;
        sessionStorage.setItem('tripid',tripid);

        fetch(`${urltriptype}${tripid}`,{method:"GET"})
        .then((res)=> res.json())
        .then((data)=>{
            this.setState({
                tripType_result : data
            })
        })
        
    }
    filterData(sortedData){
        this.setState({tripType_result:sortedData})
    }
    render() {
        // console.log("In tripType page props are: ",this.props)
        // console.log("state triptype: ", this.state)
        return (
            <div style={{padding:"34px"}}>
                <div>
                    <h1>Hotels</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <CostFilter  atcostHotel = {(data)=>{this.filterData(data)}}/>
                    </div>
                    <div className="col-md-10">
                        <TripDisplay  hotel_data = {this.state.tripType_result}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TripType;
