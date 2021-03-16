import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const TripDisplay = (props) => {
  const renderTrip = ({ hotel_data }) => {
    if (hotel_data) {
      return hotel_data.map((item) => {
        return (
          <div className="col-md-4" id={item._id}>
            <div
              className="card"
              style={{ marginBottom: "50px", height: "400px", padding: "10px" }}
            >
              <img style={{height:"250px"}} src={item.thumb} alt="images" />

              <h5>
                {item.name}, {item.city_name}
              </h5>
              <h6>Price : {item.cost}/ Day</h6>
              <label>
                <Link to={`/details/${item._id}`}>
                  <button className="btn btn-outline-secondary" type="submit">
                    More Details
                  </button>
                </Link>
              </label>
            </div>
          </div>
        );
      });
    } else {
      return <Spinner animation="border" role="status"></Spinner>;
    }
  };

  return <div className="row">{renderTrip(props)}</div>;
};

export default TripDisplay;
