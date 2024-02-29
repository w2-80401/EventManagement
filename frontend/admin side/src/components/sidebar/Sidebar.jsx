// Sidebar.js

import "./sidebar.css";
import { LineStyle, Timeline } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                    <Link to="/" className="link">
                        <li className={`sidebarListItem ${activeItem === 'Home' ? 'active' : ''}`} onClick={() => handleItemClick('Home')}>
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        </Link>
                        <Link to="/payments" className="link">
                        <li className={`sidebarListItem ${activeItem === 'Analytics' ? 'active' : ''}`} onClick={() => handleItemClick('Analytics')}>
                            <Timeline className="sidebarIcon" />
                            Payments
                        </li>
                        </Link>
                        <Link to="/bookings" className="link">
                        <li className={`sidebarListItem ${activeItem === 'Bookings' ? 'active' : ''}`} onClick={() => handleItemClick('Bookings')}>
                            <TrendingUpIcon className="sidebarIcon" />
                            Bookings
                        </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">User</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className={`sidebarListItem ${activeItem === 'User' ? 'active' : ''}`} onClick={() => handleItemClick('User')}>
                                <LineStyle className="sidebarIcon" />
                                User
                            </li>
                        </Link>
                        <Link to="/newuser" className="link">
                            <li className={`sidebarListItem ${activeItem === 'New User' ? 'active' : ''}`} onClick={() => handleItemClick('New User')}>
                                <Timeline className="sidebarIcon" />
                                New User
                            </li>
                        </Link>
                        
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Event</h3>
                    <ul className="sidebarList">
                        <Link to="/events" className="link">
                            <li className={`sidebarListItem ${activeItem === 'User' ? 'active' : ''}`} onClick={() => handleItemClick('User')}>
                                <LineStyle className="sidebarIcon" />
                                Event List
                            </li>
                        </Link>
                        <Link to="/newevent" className="link">
                            <li className={`sidebarListItem ${activeItem === 'New User' ? 'active' : ''}`} onClick={() => handleItemClick('New User')}>
                                <Timeline className="sidebarIcon" />
                                New Event
                            </li>
                        </Link>
                        <Link to="/eventcard" className="link">
                        <li className={`sidebarListItem ${activeItem === 'Transaction' ? 'active' : ''}`} onClick={() => handleItemClick('Transaction')}>
                            <TrendingUpIcon className="sidebarIcon" />
                            Event Card View
                        </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Venue</h3>
                    <ul className="sidebarList">
                        <Link to="/venuelist" className="link">
                            <li className={`sidebarListItem ${activeItem === 'Venue List' ? 'active' : ''}`} onClick={() => handleItemClick('Venue List')}>
                                <LineStyle className="sidebarIcon" />
                                Venue List
                            </li>
                        </Link>
                        <Link to="/newvenue" className="link">
                            <li className={`sidebarListItem ${activeItem === 'Add Venue' ? 'active' : ''}`} onClick={() => handleItemClick('Add Venue')}>
                                <LineStyle className="sidebarIcon" />
                                Add Venue
                            </li>
                        </Link>
                        <Link to="/venuecard" className="link">
                            <li className={`sidebarListItem ${activeItem === 'Venue Card View' ? 'active' : ''}`} onClick={() => handleItemClick('Venue Card View')}>
                                <TrendingUpIcon className="sidebarIcon" />
                                Venue Card View
                            </li>
                        </Link>
                        </ul>
                    </div>
                </div>
            </div>
    );
}
