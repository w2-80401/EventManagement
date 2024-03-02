import { useState, useEffect } from "react";
import axios from "axios";
import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function WidgetsSm () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get("http://localhost:4001/user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data.data || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const sortedUsers = users.slice().sort((a, b) => b.id - a.id);

    const latestUsers = sortedUsers.slice(0, 5);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Member</span>
            <ul className="widgetSmList">
                {latestUsers.map((user, index) => (
                    <li key={index} className="widgetSmListItem">
                        <img
                            src={user.profilePic || "https://via.placeholder.com/150"}
                            alt={`User ${index + 1}`}
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.firstName} {user.lastName}</span>
                            <span className="widgetSmUserTitle">{user.jobTitle}</span>
                        </div>
                        <button className="widgetSmButton">
                            <VisibilityIcon className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
