import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from '../config';

const UserBookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.server}/order/bookingDetails/user/${userId}`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        console.log('Response data:', response.data);
        const data = response.data.data.map(booking => ({
          ...booking,
          total_price: parseFloat(booking.total_price), // Parse total_price as a float
          booking_date: booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : '', // Format booking_date
          booking_timestamp: booking.booking_timestamp ? new Date(booking.booking_timestamp).toLocaleString() : '', // Format booking_timestamp
        }));
        setBookingDetails(data);
      } catch (error) {
        console.error('Failed to fetch booking details:', error);
      }
    };

    if (userId) {
      fetchBookingDetails();
    }
  }, [userId]);

  const sortedBookingDetails = [...bookingDetails].sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      <h2>Booking Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Venue Name</th>
            <th>Attendees</th>
            <th>Total Price</th>
            <th>Booking Date</th>
            <th>Booking Timestamp</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedBookingDetails.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.event_name}</td>
              <td>{booking.venue_name}</td>
              <td>{booking.attendees}</td>
              <td>{booking.total_price}</td>
              <td>{booking.booking_date}</td>
              <td>{booking.booking_timestamp}</td>
              <td>{booking.payment_status}</td>
              <td>
                {booking.payment_status === 'unpaid' && (
                  <Link to={`/payment/${booking.id}/${booking.total_price}`} className="btn btn-primary">
                    Pay Now
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserBookingDetails;
