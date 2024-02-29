import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import EventList from "./pages/EventList/EventList";
import Newevent from "./pages/newEvent/NewEvent";
import NewVenue from "./pages/newVenue/NewVenue"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VenueList from "./pages/venueList/VenueList";
import VenueCard from "./pages/venueCard/VenueCard";
import EventCard from "./pages/eventCard/EventCard";
import BookingDetails from "./pages/bookings/Bookings";
import PaymentList from "./pages/payments/payments";
import Login from "./pages/Login/Login";





function App() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  
  return (
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Router>
          <div>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UserList />} />      
                <Route path="/newuser" element={<NewUser />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/newevent" element={<Newevent />} />
                <Route path="/newvenue" element={<NewVenue />} />
                <Route path="/venuelist" element={<VenueList />} />
                <Route path="/venuecard" element={<VenueCard />} />
                <Route path="/eventcard" element={<EventCard />} />
                <Route path="/bookings" element={<BookingDetails />} />
                <Route path="/payments" element={<PaymentList />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </Router>
      )};
    </>
  );
}

export default App;