

import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';


const Footer = (props) => {
    const bookings = () =>{
      if(sessionStorage.getItem("login_token")){
        props.history.push("/viewbookings")
      }
      else{alert("Please login first")}
    }
    return(
        <center style={{fontSize:"larger",backgroundColor:"#f1f1f1",overflow:"hidden",height:"200px",padding:"20px"}}>

            <div className="row" style={{height:"100px",overflow: "hidden"}}>
                <div className="col-md-4">
                    <Link to='/'><b style={{color:"grey"}}>Home | <HomeIcon/></b></Link>
                </div>
                <div className="col-md-4">
                    <b onClick={bookings} style={{color:"grey",cursor:"pointer"}}>Bookings | <BookIcon/></b>
                </div>
                <div className="col-md-4">
                    <b style={{color:"grey",cursor:"pointer"}}>
                        Connect |  <GitHubIcon/> <InstagramIcon/> <FacebookIcon/>
                    </b>     
                </div>
            </div>
            <div style={{color:"grey"}}>
                <p><i>Developed by : Keshav Priyadarshi</i></p>
                <p>copyright &#169; Travenation - All rights reserved</p>
            </div>
        </center>
    )
}
export default withRouter(Footer)