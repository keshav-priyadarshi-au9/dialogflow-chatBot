import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import travenation from '../images/travenation.jpg'

function Header(props) {
  const handleLogout = () => {
    // console.log("Header",props)
    sessionStorage.removeItem("login_token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("email")
    props.history.push("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand" to="/">
            
            <h3 style={{marginLeft:"30px",color:"grey"}}>

              <img style={{width:"30px",marginRight:"10px"}} src={travenation} alt="travenation"/>
              Travenation

            </h3>

          </Link>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <form className="d-flex">
              {sessionStorage.getItem("login_token") ? (
                <>
                  <Link to="/dashboard">
                    <button style={{width:"100px"}} className="btn btn-outline-secondary" type="submit">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    style={{width:"100px",marginLeft:"10px"}}
                    className="btn btn-outline-danger"
                    type="submit"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button style={{width:"150px"}} className="btn btn-outline-secondary" type="submit">
                      LogIn
                    </button>
                  </Link>
                 
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);
