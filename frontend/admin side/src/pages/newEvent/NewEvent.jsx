import React, { useState } from 'react';
import axios from 'axios';
import "./newEvent.css";
import { toast } from 'react-toastify';

export default function NewEvent() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.details || !formData.image) {
        toast.error("Please fill in all fields.");
        return;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('details', formData.details);
      formDataToSend.append('image', formData.image);
  
      const response = await axios.post('http://localhost:4001/event/add', formDataToSend);
      console.log(response.data);
      toast.success("Event Added Successfully");
  
      // Clear form fields after successful submission
      setFormData({
        name: '',
        image: '',
        details: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error");
      // Handle error, show toast message or any other UI feedback
    }
  };
  

  return (
    <div className="newevent">
      <h1 className="addeventTitle">New Event</h1>
      <form className="addeventForm" onSubmit={handleSubmit}>
        <div className="addeventItem">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Event Name" />
        </div>
        <div className="addeventItem">
          <label>Details</label>
          <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Event Details"></textarea>
        </div>
        <div className="addeventItem">
          <label>Image</label>
          <input type="file" id="file" className="addeventImageBtn" onChange={handleFileChange} />
        </div>
        <button type="submit" className="addeventButton">Create</button>
      </form>
    </div>
  );
}
