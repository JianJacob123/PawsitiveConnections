import React, { useEffect, useState } from 'react';
import AdminSbar from '../components/AdminSbar';
import './css/AccountM.css';
import axios from 'axios';

const AccManagement = () => {
    const [data, setData] = useState([]); // Use this to store the user data
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    const urldata = "http://localhost/AdoptionWebsite/PHP/AccManagement.php";

    useEffect(() => {

        axios.get(urldata)
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                setData(responseData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter data based on search term
    const filteredData = data.filter(item => {
        return (
            item.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lname.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    const handleAccDelete = (user_id) => {
        const urldeleteuser = `http://localhost/AdoptionWebsite/PHP/AccManagement.php?id=${user_id}`;

        axios.delete(urldeleteuser)
            .then(res => {
                console.log(res.data.status);
                setData(prevData => prevData.filter(item => item.user_id !== user_id));
                if(res.data.message === 'success'){
                    alert('Account Deleted Successfuly')
                } else{
                    console.log('failed')
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='AccM-Container'>
            <AdminSbar />
            <div className="main-content">
                <h1>ACCOUNT MANAGEMENT</h1>
                <input
                    type="text"
                    placeholder="Search by first or last name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <div className="AccM-Table">
                    <h2 className='table-title'>USERS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.user_id}> {/* Ensure item.userid is unique */}
                                    <td>{item.user_id}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>
                                        <button className="btn-delete"onClick={() => handleAccDelete(item.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccManagement;
