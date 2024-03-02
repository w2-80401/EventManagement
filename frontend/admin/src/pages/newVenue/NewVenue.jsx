import { useState } from 'react';
import axios from 'axios';
import "./newVenue.css";
import { toast } from 'react-toastify';

export default function NewVenue() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!name || !capacity || !price || !location || !details || !imageFile) {
      toast.error("Name, capacity, price, location, details, and image are required fields");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('capacity', capacity);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('details', details);
    formData.append('image', imageFile);

    try {
      // Send a POST request to the API endpoint
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:4001/venue/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      toast.success("Venue Added Successfully");

      setName("");
      setCapacity("");
      setPrice("");
      setLocation("");
      setDetails("");
      setImageFile(null);

    } catch (error) {
      console.error('Error adding venue:', error);
      toast.error("Error Adding Venue");
    }
  };

  return (
    <div className="newevent">
      <h1 className="addeventTitle">Add Venue</h1>
      <form className="addeventForm" onSubmit={handleFormSubmit}>
        <div className="addeventItem">
          <label>Name</label>
          <input type="text" placeholder="Wedding" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Capacity</label>
          <input type="text" placeholder="123" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Price</label>
          <input type="text" placeholder="10.00" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Location</label>
          <input type="text" placeholder="Venue location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="addeventItem">
          <label>Details</label>
          <textarea rows="4" placeholder="Venue details" value={details} onChange={(e) => setDetails(e.target.value)}></textarea> {/* Add textarea for venue details */}
        </div>
        <div className="addeventItem">
          <label>Upload Image</label>
          <input type="file" id="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="addeventButton">Create</button>
      </form>
    </div>
  );
}
