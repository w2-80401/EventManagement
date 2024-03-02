import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./eventList.css";
import config from '../../config/config';

export default function EventList() {
    const [data, setData] = useState([]);
    const [editableRow, setEditableRow] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(config.server+'/event',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.data.map(event => ({
                    ...event,
                    id: event.id.toString(), 
                })));
            } catch (error) {
                console.error('Error fetching events:', error);
                toast.error("Error Fetching Events");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.delete(`http://localhost:4001/event/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(data.filter((item) => item.id !== id));
            toast.success("Event Deleted Successfully");
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error("Error Deleting Event");
        }
    };

    const handleEdit = (id) => {
        setEditableRow(id);
    };

    const handleUpdate = async (updatedData) => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.put(`http://localhost:4001/event/update/${updatedData.id}`, updatedData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Event Updated Successfully");
            setEditableRow(null); 
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error("Error Updating Event");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: false },
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'details', headerName: 'Details', width: 200, editable: true },
        {
            field: 'image',
            headerName: 'Image',
            width: 130,
            renderCell: (params) => (
                <a href={"http://localhost:4001/"+ params.value} target="_blank" rel="noopener noreferrer">
                    <img
                        src={"http://localhost:4001/"+ params.value}
                        alt={`Event ${params.row.id}`}
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                </a>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="actionButtons">
                    {editableRow === params.row.id ? (
                        <>
                            <button className="eventListUpdate" onClick={() => handleUpdate(params.row)}>Update</button>
                            <button className="eventListCancel" onClick={() => setEditableRow(null)}>Cancel</button>
                        </>
                    ) : (
                        <button className="eventListEdit" onClick={() => handleEdit(params.row.id)}>Edit</button>
                    )}
                    <DeleteIcon className="eventListDelete" onClick={() => handleDelete(params.row.id)} />
                </div>
            )
        },
    ];

    return (
        <div className="eventList">
            <h1 className="eventListTitle">Event List</h1>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                isCellEditable={(params) => editableRow === params.id && params.field !== 'image'}
            />
        </div>
    );
}
