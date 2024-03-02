import React, { useState, useEffect } from "react";
import axios from "axios";
import "./eventCard.css"; 
import config from "../../config/config";

function EventCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get("http://localhost:4001/event/",
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setEvents(response.data.data || []);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="venue-list">
      {events.map((event) => (
        <div key={event.id} className="venue-card">
          <div className="venue-details">
            <div>
              <img src={config.server + "/" + event.image} alt={event.name} className="venue-image" />
            </div>
            <h2>{event.name}</h2>
            <p>Details: {event.details}</p>
            <p>Created Timestamp: {event.createdTimestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventCard;
