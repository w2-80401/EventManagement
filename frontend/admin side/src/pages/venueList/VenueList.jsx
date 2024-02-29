import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./venueList.css";
import config from '../../config/config';

export default function VenueList() {
    const [data, setData] = useState([]);
    const [editableRow, setEditableRow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(config.server+'/venue',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.data.map(venue => ({
                    ...venue,
                    id: venue.id.toString(), 
                })));
            } catch (error) {
                console.error('Error fetching venues:', error);
                toast.error("Error Fetching Venues");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4001/venue/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(data.filter((item) => item.id !== id));
            toast.success("Venue Deleted Successfully");
        } catch (error) {
            console.error('Error deleting venue:', error);
            toast.error("Error Deleting Venue");
        }
    };

    const handleEdit = (id) => {
        setEditableRow(id);
    };

    const handleUpdate = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4001/venue/update/${updatedData.id}`, updatedData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Venue Updated Successfully");
            setEditableRow(null); 
        } catch (error) {
            console.error('Error updating venue:', error);
            toast.error("Error Updating Venue");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'capacity', headerName: 'Capacity', width: 130, editable: true },
        { field: 'price', headerName: 'Price', width: 130, editable: true },
        { field: 'location', headerName: 'Location', width: 130, editable: true },
        {
            field: 'image',
            headerName: 'Image',
            width: 130,
            renderCell: (params) => (
                <a href={"http://localhost:4001/"+ params.value} target="_blank" rel="noopener noreferrer">
                    <img
                        src={"http://localhost:4001/"+ params.value}
                        alt={`Venue ${params.row.id}`}
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                </a>
            )
        },
        { field: 'details', headerName: 'Details', width: 200, editable: true },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="actionButtons">
                    {editableRow === params.row.id ? (
                        <>
                            <button className="venueListUpdate" onClick={() => handleUpdate(params.row)}>Update</button>
                            <button className="venueListCancel" onClick={() => setEditableRow(null)}>Cancel</button>
                        </>
                    ) : (
                        <button className="venueListEdit" onClick={() => handleEdit(params.row.id)}>Edit</button>
                    )}
                    <DeleteIcon className="venueListDelete" onClick={() => handleDelete(params.row.id)} />
                </div>
            )
        },
    ];

    return (
        <div className="venueList">
            <h1 className="addeventTitle">Venue List</h1>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                isCellEditable={(params) => editableRow === params.id}
                
            />
        </div>
    );
}
