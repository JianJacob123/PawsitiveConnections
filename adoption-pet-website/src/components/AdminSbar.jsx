import React from 'react'
import  './AdminSbar.css';
import {} from "react-icons/fa"
import {  FaUser,FaList   } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { MdPets,MdLogout  } from "react-icons/md";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const AdminSbar = () => {

    const [fname, setFname] = useState('');

    useEffect(() => {
        const storedFname = localStorage.getItem('fname');
        if (storedFname) {
            setFname(JSON.parse(storedFname));
        }
    }, []);

    const handleLogOut = async (e) => {
        e.preventDefault();
        const urllogout = "http://localhost/AdoptionWebsite/PHP/logout.php";

        try {
            const response = await axios.post(urllogout);
            if (response.data.status === 'success') {
                alert('Logged Out Successfully');
                localStorage.removeItem('user');
                localStorage.removeItem('fname');
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (

        <div className="adminSbar-wrapper">
            <div className="adminSbar-container">
                <nav>
                        <h2 className='Title'>DASH BOARD</h2><br/>

                        <div className="info-container">
                            <div className="info-name">
                                <FaUser className='AS-icon' />
                                <p>User : {fname} </p>
                            </div>
                        </div>

                    <ul>
                        <li>
                            <Link to="/Admin" class="logo">
                                <GoGraph className='AS-icon' />
                                <span className="nav-item">Analytics</span>
                            </Link>
                        </li>


                        <li>
                            <Link to = "/AccManagement" className="logo">
                                <FaUser className='AS-icon' />
                                <span className="nav-item">Manage Account</span>
                            </Link>
                        </li>


                        <li>
                            <Link to = '/AdoptionA'className="logo">
                            <FaList className='AS-icon' />
                            <span className="nav-item">Adoption Application </span>
                            </Link>
                        </li>

                        <li>
                            <Link to = '/PetList' className="logo">
                            <MdPets className='AS-icon'/>
                            <span className="nav-item">Pet List</span>
                            </Link>
                        </li>

                        <li>
                            <Link to = '/AdoptTrack' className="logo">
                            <MdPets className='AS-icon'/>
                            <span className="nav-item">Completed Adoptions</span>
                            </Link>
                        </li>

                        <li onClick={handleLogOut}>
                            <Link to = '/'>
                            <MdLogout className='AS-icon'/>
                            <span className="nav-item">Logout</span>
                            </Link>

                        </li>
                    </ul>
                </nav>
            
            </div>

        </div>
    )
}

export default AdminSbar
