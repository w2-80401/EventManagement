import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('role');
    // Redirect to the login page or any other desired page
    window.location.href = '/login'; // Change the URL as per your routing setup
  };

  return (
    <nav className="bg-gray-800">
      <div className="px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="mr-auto">
          <Link to="/" className="text-white text-4xl font-bold">Evntify</Link>
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-7">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/services" className="text-white hover:text-gray-300">Services</Link>
          <Link to="/gallery" className="text-white hover:text-gray-300">Gallery</Link>
          <Link to="/venue" className="text-white hover:text-gray-300">Venue</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
          {/* Conditional rendering for Booking link */}
          {localStorage.getItem('token') && (
            <Link to="/userBooking" className="text-white hover:text-gray-300">Booking</Link>
          )}
        </div>
        {/* Conditional rendering for Login/Logout button */}
        <div className="ml-auto">
          {localStorage.getItem('token') ? (
            <button onClick={handleLogout} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
