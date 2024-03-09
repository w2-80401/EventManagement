import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import EventDetails from './pages/EventDetails';
import Services from './pages/Services';
import Contactus from './pages/Contactus';
import Gallary from './pages/Gallary';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Venue from './pages/Venue';
import BookingForm from './pages/BookingForm';
import { ToastContainer } from 'react-toastify'; // Remove the 'toast' import
import 'react-toastify/dist/ReactToastify.css';
import VenueDetails from './pages/VenueDetails';
import UserBookingDetails from './pages/userBooking';
import PaymentPage from './pages/PaymentPage'
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/venue/:id" element={<VenueDetails/>}/>
          <Route path='/contact' element={<Contactus />} />
          <Route path='/gallary' element={<Gallary />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/venue' element={<Venue />} />
          <Route path='/book' element={<BookingForm />} />
          <Route path='/userbooking' element={<UserBookingDetails />} />
          <Route path='/payment/:bookingId/:amount' element={<PaymentPage/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
