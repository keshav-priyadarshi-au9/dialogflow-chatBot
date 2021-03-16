import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import TripType from '../TripType/TripType';
import HotelDetails from '../HotelDetails/HotelDetails';
import BookingForm from '../PlaceBooking/BookingForm';
import LogIn from '../Login/LogIn';
import SignUp from '../Signup/SignUp';
import User_Dashboard from '../User_Dashboard/User_Dashboard';
import Admin_Dashboard from '../../Admin-Dashboard/Admin_Dashboard';
import Admin_View_Booking from '../../Admin-Dashboard/Admin_View_Booking'
import View_Users from '../../Admin-Dashboard/View_Users';
import CompletedBookings from '../../Admin-Dashboard/CompletedBookings';
import View_Booking from '../User_Dashboard/View_Bookings';

const error=()=>{
    return(<h2>ERROR 404! page not found</h2>)
    
}
const Routing = () => {
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path="/login" component={LogIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/dashboard" component={User_Dashboard}/>
                <Route path="/admindashboard" component={Admin_Dashboard}/>
                <Route path="/viewusers" component={View_Users}/>
                <Route path="/adminviewbookings" component={Admin_View_Booking}/>
                <Route path="/viewbookings" component={View_Booking}/>
                <Route path="/completedbooking" component={CompletedBookings}/>
                <Route path='/list/:id' component={TripType}/>
                <Route path='/details/:id' component={HotelDetails}/>
                <Route path="/booking/:id" component={BookingForm}/>
                <Route component={error}/>
            </Switch>
            <Footer />
        </React.Fragment>
    )
}

export default Routing;
