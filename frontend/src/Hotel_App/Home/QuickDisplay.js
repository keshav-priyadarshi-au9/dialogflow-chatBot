import React from "react";
import { Link } from "react-router-dom";
import {Spinner} from 'react-bootstrap'
// import "./quickdisplay.css";

const QuickDisplay = (props) => {

  const renderTripType = ({ tripType_data }) => {
    if (tripType_data) {
      return tripType_data.map((item) => {
        return (
          <div className="col-md-6" key={item.trip}>

            <div className="card" style={{ marginBottom: "50px", height: "400px", padding: "10px" }}>
              <img
                src={item.image}
                style={{height:"250px"}}
                alt="triptypeimage"
                />
              <div className="card-body">
                <p className="card-text">
                  Start your trip in {item.name} style{" "}
                </p>
                <Link to={`/list/${item.trip}`} className="btn btn-outline-secondary">
                  {item.name}
                </Link>
              </div>
            </div>
          </div>
        );
      });
    }
    else{
      return(  
        <Spinner animation="border" role="status"></Spinner> 
      )     
  }
  };
  
  return (
    <>{renderTripType(props)}</>
  )
};

export default QuickDisplay;
