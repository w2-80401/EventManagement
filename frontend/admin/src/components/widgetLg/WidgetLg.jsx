import { useState, useEffect } from "react";
import axios from "axios";
import "./widgetLg.css";

export default function WidgetLg() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get("http://localhost:4001/order/allbookings",
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        setBookings(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);


  const latestBookings = bookings.slice().sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {latestBookings.map((booking, index) => (
          <tr key={index} className="widgetLgTr">
            <td className="widgetLgUser">
              <img
                src={booking.profilePic || "https://via.placeholder.com/150"}
                alt=""
                className="widgetLgImg"
              />
              <span className="widgetLgName">{`${booking.firstName} ${booking.lastName}`}</span>
            </td>
            <td className="widgetLgDate">{booking.booking_date}</td>
            <td className="widgetLgAmount">{`$${booking.total_price}`}</td>
            <td className="widgetLgStatus">{booking.payment_status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
