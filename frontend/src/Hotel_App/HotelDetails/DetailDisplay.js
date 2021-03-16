import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const tripID = sessionStorage.getItem("tripid");

const DetailDisplay = (props) => {
  const bookingHandler = () => {
    if (sessionStorage.getItem("login_token")) {
      props.history.push(`/booking/${tripID}`);
    } else {
      alert("for booking user must have to login first....");
      props.history.push("/login");
    }
  };
  const renderDetails = ({ details_data }) => {
    // const tripID = sessionStorage.getItem('tripid')
    if (details_data) {
      // console.log("In details display page", {details_data})
      // console.log(details_data.name)
      const item = details_data;
      return (
        <div className="col-md-8">
          <img src={item.thumb} alt="images" />
          <h3>
            {item.name}, {item.city_name}
          </h3>
          <p>{item.locality}</p>
          <p>{item.address}</p>
          <h5>Price {item.cost}/night</h5>

          <div className="row">
            <div className="col-md-6">
          <Link className="col-md-6" style={{width:"150px"}} to={`/list/${tripID}`}>
            <button style={{width:"150px"}} className="btn btn-outline-secondary" type="submit">
              Back
            </button>
          </Link>

          <button
            style={{width:"150px"}}
            className="col-md-6 btn btn-outline-success"
            type="submit"
            onClick={bookingHandler}
          >
            Place Booking
          </button>
          </div>
          </div>

        </div>
      );
    } else {
      return (
        
        <Spinner animation="border" role="status"></Spinner>
        
      );
    }
  };
  return <div className="row justify-content-md-center" style={{overflow:"hidden"}}>{renderDetails(props)}</div>;
};


export default withRouter(DetailDisplay);