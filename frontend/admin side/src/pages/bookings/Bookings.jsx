import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config/config';

const BookingDetails = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(config.server + '/order/allbookings',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setData(response.data.data.map(booking => ({
                    ...booking,
                })));
            } catch (error) {
                console.error('Error fetching booking details:', error);
                toast.error("Error Fetching Booking Details");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4001/bookingdetails/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setData(data.filter((item) => item.id !== id));
            toast.success("Booking Details Deleted Successfully");
        } catch (error) {
            console.error('Error deleting booking details:', error);
            toast.error("Error Deleting Booking Details");
        }
    };

    const columns = [
        { field: 'id', headerName: 'Booking Id', width: 100 },
        { field: 'user_id', headerName: 'User ID', width: 100 },
        { field: 'firstName', headerName: 'First Name', width: 120 },
        { field: 'lastName', headerName: 'Last Name', width: 120 },
        { field: 'phone', headerName: 'Phone', width: 120 },
        { field: 'event_name', headerName: 'Event Name', width: 150 },
        { field: 'venue_name', headerName: 'Venue Name', width: 150 },
        { field: 'attendees', headerName: 'Attendees', width: 120 },
        { field: 'total_price', headerName: 'Total Price', width: 120 },
        { field: 'booking_date', headerName: 'Booking Date', width: 150 },
        { field: 'payment_status', headerName: 'Payment Status', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <DeleteIcon className="eventListDelete" onClick={() => handleDelete(params.row.id)} />
            )
        },
    ];

    return (
        <div className="eventList">
            <h1 className="eventListTitle">Booking Details</h1>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
export default BookingDetails;
