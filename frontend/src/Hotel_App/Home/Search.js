import React, { Component } from "react";
import { withRouter } from "react-router-dom";


const locationurl = "https://developerfunnel.herokuapp.com/location";
const hotelurl = "https://developerfunnel.herokuapp.com/hotels?city=";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
      hotel: "",
    };
  }

  componentDidMount() {
    fetch(locationurl, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          location: data,
        });
      });
    // console.log(this.state.location);
  }

  handleChange_city = (event) => {
    // console.log(event.target.value);
    const cityId = event.target.value;
    fetch(`${hotelurl}${cityId}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          hotel: data,
        });
      });
  };

  renderCity = (location_data) => {
    if (location_data) {
      return location_data.map((item) => {
        return <option key={item._id} value={item.city}>{item.city_name}</option>;
      });
    }
  };

  renderHotel = (hotel_data) => {
    if (hotel_data) {
      return hotel_data.map((item) => {
        return (
          <option value={item._id}>
            {item.name} | {item.locality}
          </option>
        );
      });
    }
  };
  handleChange_hotel = (event) => {
    this.props.history.push(`/details/${event.target.value}`);
  };
  render() {
    // console.log(this.state.location);
    return (
      <div style={{alignItems:"center",marginTop:"50px"}}>
        <div className="row justify-content-md-center">
          <div className="col-md-2">
            <select
              id="cityname"
              className="form-control"
              onChange={this.handleChange_city}
            >
              <option>---Select City---</option>
              {this.renderCity(this.state.location)}
            </select>
            </div>
            <div className="col-md-4">
            <select
              id="hotelname"
              className="form-control"
              onChange={this.handleChange_hotel}
            >
              <option>---Select Hotel---</option>
              {this.renderHotel(this.state.hotel)}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
