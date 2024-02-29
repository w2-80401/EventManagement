import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/featuredInfo";
import "./home.css"
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetsSm from "../../components/widgetSm/WidgetSm";

export default function Home() {
    const [bookingData, setBookingData] = useState([]);
    
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get("http://localhost:4001/user/", {
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
    },  );
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={bookingData} title="User Analytics" grid={true} dataKey="UserCount" />
            <div className="homeWidgets">
                <WidgetsSm />
                <WidgetLg />
            </div>
        </div>
    );
}
