import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import AboutUs from '../components/Aboutus';
import config from '../config';

import BookingForm from './BookingForm';

const EventDetails = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.server}/event/${id}`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setEvent(response.data.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails(); 

  }, [id]); 

  if (!event) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex">
      {/* Left Container */}
      <div className="md:container mr-auto -ml-20 max-w-xs">
        <h1 className="text-center mb-4">Event Details</h1>
        <div className="container">
          <img src={`${config.server}/${event.image}`} className="card-img-top" alt={event.name} />
          <div>
            <h5>{event.name}</h5>
            <p>{event.details}</p>
          </div>
          <div>
            <AboutUs />
          </div>
        </div>
        <Footer />
      </div>

      {/* Right Container */}
      <div className="flex-1 p-4">
        <h2 className="text-center mb-4">Book Venue</h2>
        <BookingForm/>
      
      </div>
    </div>
  );
};

export default EventDetails;
