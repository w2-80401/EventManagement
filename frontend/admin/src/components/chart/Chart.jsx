import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ title, dataKey, grid }) {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:4001/order/allbookings",
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setBookingData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBookingData();
  }, []);

  const transformData = () => {
    const dailyBookings = {};
    bookingData.forEach((booking) => {
      const timestamp = booking.booking_timestamp;
      const date = new Date(timestamp).toLocaleDateString(); 
      if (dailyBookings[date]) {
        dailyBookings[date] += 1; 
      } else {
        dailyBookings[date] = 1; 
      }
    });

    const transformedData = Object.keys(dailyBookings).map((date) => ({
      name: date,
      [dataKey]: dailyBookings[date],
    }));

    return transformedData;
  };

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={transformData()}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
