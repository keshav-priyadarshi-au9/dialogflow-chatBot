import React, {Component} from 'react';
import axios from 'axios';
const costURL = "https://developerfunnel.herokuapp.com/hotellist/" 
// 1?hcost=1000&lcost=500

class CostFilter extends Component{
    handleChange=(event)=>{
        let value_data = event.target.value
        // console.log(typeof value_data)
        let tripID = sessionStorage.getItem('tripid')
        // console.log(`event value ${value_data} and tripid ${tripID}`)
    
        let new_url;
        if (value_data === ""){
            new_url = `${costURL}${tripID}`
        }
        else if (value_data === "1"){
            new_url = `${costURL}${tripID}?hcost=3000&lcost=1000`
        }
        else if (value_data === "2"){
            new_url = `${costURL}${tripID}?hcost=6000&lcost=3001`
        }
        else if (value_data === "3"){
            new_url = `${costURL}${tripID}?hcost=20000&lcost=6001`
        }
        axios.get(new_url)
        .then((response)=>{this.props.atcostHotel(response.data)})
    }

    render(){
        return(
            <div>
                <div className="card" onChange={this.handleChange} style={{padding:"10px"}}>
                    <h5>Cost Filter</h5>
                    <label className="radio">
                        <input type="radio" value="" name="room"/>All
                    </label>
                    <label className="radio">
                        <input type="radio" value="1" name="room"/>RS 1000-3000
                    </label>
                    <label className="radio">
                        <input type="radio" value="2" name="room"/>RS 3001-6000
                    </label>
                    <label className="radio">
                        <input type="radio" value="3" name="room"/>RS 6001-above
                    </label>
                </div>
            </div>
        )
    }
}
export default CostFilter;