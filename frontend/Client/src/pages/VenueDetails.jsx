import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { useAuth } from '../AuthContext';

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.server}/venue/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setVenue(response.data.data);
      } catch (error) {
        console.error('Error fetching venue details:', error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleBooking = () => {
    window.location.href = `/book?venue=${venue.id}`;
  };

  return (
    <div className="md:container mr-auto -ml-20 max-w-xs">
      <h1 className="text-center mb-4">Venue Details</h1>
      <div className="container">
        {venue && (
          <>
            <img src={`${config.server}/${venue.image}`} className="card-img-top" alt={venue.name} />
            <div>
              <h5>{venue.name}</h5>
              <p>Capacity: {venue.capacity}</p>
              <p>Price: ${venue.price}</p>
              <p>{venue.details}</p>
              {isLoggedIn && (
                <button onClick={handleBooking} className="btn btn-primary">Book</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VenueDetails;
