import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config/config';

export default function PaymentList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(config.server + '/order/payment/all',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.data.map(payment => ({
                    ...payment,
                    id: payment.id.toString(),
                })));
            } catch (error) {
                console.error('Error fetching payments:', error);
                toast.error("Error Fetching Payments");
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); 
            await axios.delete(`http://localhost:4001/order/payment/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(data.filter((item) => item.id !== id));
            toast.success("Payment Deleted Successfully");
        } catch (error) {
            console.error('Error deleting payment:', error);
            toast.error("Error Deleting Payment");
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'booking_id', headerName: 'Booking ID', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'payment_date', headerName: 'Payment Date', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="actionButtons">
                    <DeleteIcon className="eventListDelete" onClick={() => handleDelete(params.row.id)} />
                </div>
            )
        },
    ];

    return (
        <div className="eventList">
            <h1 className="eventListTitle">Payment List</h1>
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
