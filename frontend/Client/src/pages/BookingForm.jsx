import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import config from '../config';

function BookingForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedVenue = queryParams.get('venue');

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(preSelectedVenue || '');
  const [attendees, setAttendees] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const attendeePrice = 200; // Price per attendee
  const [totalPrice, setTotalPrice] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
    fetchVenues();
  }, []);

  const fetchEvents = async () => {
    try {

      const response = await fetch(`${config.server}/event`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      const data = await response.json();
      setEvents(data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchVenues = async () => {
    try {
      const response = await fetch(`${config.server}/venue`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      const data = await response.json();
      setVenues(data.data || []);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
    setTotalPrice('');
  };

  const handleVenueChange = (event) => {
    setSelectedVenue(event.target.value);
    setTotalPrice('');
  };

  const handleAttendeesChange = (event) => {
    setAttendees(event.target.value);
    calculateTotalPrice(event.target.value);
  };

  const handleDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const calculateTotalPrice = (attendees) => {
    const venuePrice = venues.find(venue => venue.id === parseInt(selectedVenue, 10))?.price || 0;
    const totalPriceForAttendees = attendees * attendeePrice;
    setTotalPrice(parseInt(venuePrice, 10) + parseInt(totalPriceForAttendees, 10));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("UserId");
    try {
      const requestBody = {
        eventId: selectedEvent,
        venueId: selectedVenue,
        attendees: parseInt(attendees),
        bookingDate,
        totalPrice,
        user_id: userId
      };

      const response = await fetch(`${config.server}/order/details`, {
        method: 'POST',
        headers: {

          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setSelectedEvent('');
        setSelectedVenue('');
        setAttendees('');
        setBookingDate('');
        setTotalPrice('');

        console.log('Form data inserted successfully!');
        window.location.href = '/userbooking';
      } else {
        console.error('Failed to insert form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error inserting form data:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="row mb-3">
        <label htmlFor="eventSelect" className="col-sm-2 col-form-label">Select Event:</label>
        <div className="col-sm-10">
          <select id="eventSelect" className="form-select" value={selectedEvent} onChange={handleEventChange}>
            <option value="">Select</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="venueSelect" className="col-sm-2 col-form-label">Select Venue:</label>
        <div className="col-sm-10">
          <select id="venueSelect" className="form-select" value={selectedVenue} onChange={handleVenueChange}>
            <option value="">Select</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name} - ${venue.price}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="attendeesInput" className="col-sm-2 col-form-label">Number of Attendees:</label>
        <div className="col-sm-10">
          <input type="number" id="attendeesInput" className="form-control" value={attendees} onChange={handleAttendeesChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="dateInput" className="col-sm-2 col-form-label">Select Date:</label>
        <div className="col-sm-10">
          <input type="date" id="dateInput" className="form-control" value={bookingDate} onChange={handleDateChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Total Price:</label>
        <div className="col-sm-10">
          <p className="form-control-static">${totalPrice}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 offset-sm-2">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default BookingForm;
