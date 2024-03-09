import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.server}/venue`,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      setVenues(response.data.data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  const filteredVenues = venues.filter(venue => {
    return venue.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Venues</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by venue title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 w-48"
        />
      </div>
      <div className="row">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="col-lg-4 col-md-6 mb-4">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <img src={`${config.server}/${venue.image}`} className="rounded-t-lg w-full h-50 object-cover" alt={venue.name} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold">{venue.name}</h5>
                <p className="mb-2 font-normal">Capacity: {venue.capacity}</p>
                <p className="mb-3 font-normal">Price: ${venue.price}</p>
                <p className="mb-3 font-normal">{venue.details}</p>
                {/* Use Link to navigate to VenueDetails */}
                <Link to={`/venue/${venue.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venue;
