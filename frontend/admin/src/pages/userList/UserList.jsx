import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { toast } from "react-toastify";
import './userList.css';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [editableRow, setEditableRow] = useState(null);
    const [editedData, setEditedData] = useState({});

    const token = localStorage.getItem('token');
    if (token.length > 0) {
        console.log(token)
    }
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token'); 
            

            const response = await axios.get("http://localhost:4001/user/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(token);
            console.log("API Response:", response.data);
            setUsers(response.data.data || []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); 
          
            await axios.delete(`http://localhost:4001/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter((user) => user.id !== id));
            console.log("User deleted successfully");
            toast.success("User Deleted Successfully")
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Error")
        }
    };

    const handleEdit = (id, userData) => {
        setEditableRow(id);
        setEditedData(userData);
    };

    const handleUpdate = async () => {
        try {
            console.log("Editable Row:", editableRow);
            console.log("Edited Data:", editedData);
            const response = await axios.put(`http://localhost:4001/user/${editableRow}`, editedData);
            console.log("Update Response:", response.data);
            toast.success("User Updated Successfully");
            setEditableRow(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error("Error Updating User");
        }
    };



    const handleChange = (e, field) => {
        const { value } = e.target;
        setEditedData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        { field: 'firstName', headerName: 'First name', width: 130, editable: true },
        { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
        { field: 'phone', headerName: 'Phone', width: 130, editable: true },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="actionButtons">
                    {editableRow === params.row.id ? (
                        <>
                            <button className="userListUpdate" onClick={handleUpdate}>Update</button>
                            <button className="userListCancel" onClick={() => setEditableRow(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="userListEdit" onClick={() => handleEdit(params.row.id, params.row)}>Edit</button>
                            <DeleteIcon className="userListDelete" onClick={() => handleDelete(params.row.id)} />
                        </>
                    )}
                </div>
            )
        },
    ];

    return (
        <div className="userList" style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                checkboxSelection
                disableSelectionOnClick
                isRowSelectable={(params) => editableRow !== params.id}
                isCellEditable={(params) => editableRow === params.id && params.field !== 'id'}
                editRowsModel={editableRow !== null ? [{ id: editableRow }] : []}
                onEditCellChange={(editCellProps) => {
                    const { field, id } = editCellProps;
                    handleChange(editCellProps, field);
                }}
            />
        </div>
    );
}
