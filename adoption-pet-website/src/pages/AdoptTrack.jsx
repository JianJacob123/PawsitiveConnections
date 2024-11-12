import React, { useEffect, useState } from 'react';
import AdminSbar from '../components/AdminSbar';
import './css/AdoptTrack.css';
import axios from 'axios';

const AdoptTrack = () => {
    const [data, setData] = useState([]); // Use this to store the user data
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    const urldata = "http://localhost/AdoptionWebsite/PHP/AdoptTrack.php";

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


    return (
        <div className='adopt-track-container'>
            <AdminSbar />
            <div className="adopt-track-main-content">
                <h1>COMPLETED ADOPTIONS</h1>
                <input
                    type="text"
                    placeholder="Search by first or last name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <div className="adopt-track-table">
                    <h2 className='adopt-track-table-title'>Adoption Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Pet Name</th>
                                <th>Adopted By</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Adoption Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.adoption_id}> {/* Ensure this is unique */}
                                    <td>{item.adoption_id}</td>
                                    <td>{item.pet_name}</td>
                                    <td>{item.fname} {item.lname}</td>
                                    <td>{item.address}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.adoption_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdoptTrack;
