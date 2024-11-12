import React, { useEffect, useState }from 'react'
import AdminSbar from '../components/AdminSbar'
import './css/AdoptionA.css'
import axios from 'axios';
import { Link } from 'react-router-dom';



const AdoptionA = () => {

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [countApproved, setcountApproved] = useState('');
    const urldata = "http://localhost/AdoptionWebsite/PHP/Application.php";

    useEffect(() => {

        axios.get(urldata)
            .then(response => {
                const responseData = Array.isArray(response.data.app) ? response.data.app : [response.data.app];
                setData(responseData);
                setcountApproved(response.data.countapproved.approve_count);
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
        <div className='AdoptionA-Container'>
            <AdminSbar />
            <div className="AD-main-content">
                <h1>ADOPTION APPLICATION DASHBOARD</h1>

                <div className="card-container">
                    <div className="card">
                        <h4 className="A-title">Approved</h4>
                        <h4>{countApproved}</h4>
                        <div className="card-btn">

                        </div>
                    </div>

                    <div className="card">
                        <h4 className='A-title'>Denied</h4>
                        <h4>0</h4>
                        <div className="card-btn">
                            
                        </div>
                    </div>
                </div>

            <section>
            <input
                    type="text"
                    placeholder="Search by first or last name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="app-search-input"
                />

            <div className="App-Table">
                    <h2 className="app-table-title">Pending Approvals</h2>
                    <table className="application-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Application Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.application_id}> {/* Ensure item.userid is unique */}
                                    <td>{item.application_id}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.application_date}</td>
                                    <td>{item.application_status}</td>
                                    <td>
                                    <Link to={`/ApplicationDetails/${item.application_id}`}>
                                <button className="btn-view">View</button>
                                    </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            </div>

        </div>
        
    )
}

export default AdoptionA
