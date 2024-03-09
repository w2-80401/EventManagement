import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config'; 

const Services = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.server}/event`,
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Function to truncate text to 100 characters
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  // Function to filter events by title
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Event handler for updating search query state
  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Events</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events by title..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="row">
        {filteredEvents.map(event => (
          <div key={event.id} className="col-lg-4 col-md-6 mb-4">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {/* Maintain the same size for all images */}
                <img src={`${config.server}/${event.image}`} className="rounded-t-lg w-full h-50 object-cover" alt={event.name} />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
                  {/* Limit the details text to 100 characters */}
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {truncateText(event.details, 200)}
                  </p>
                  <h6 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                  </h6>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
