import React, { useState } from 'react';
import axios from 'axios';
import "./newUser.css";
import { toast } from 'react-toastify';

export default function NewUser() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.phone) {
        toast.error("Please fill in all fields.");
        return;
      }

      // Email validation regex
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      const response = await axios.post('http://localhost:4001/user/signup', formData);
      console.log(response.data);
      toast.success("User Added Successfully"); 
      // Clear form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error');
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Smith"
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@gmail.com"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 123 456 78"
          />
        </div>
        <button type="submit" className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
