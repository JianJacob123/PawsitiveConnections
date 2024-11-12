import React, { useState, useEffect} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [data, setData] = useState({}); 

    
    const urldata = "http://localhost/AdoptionWebsite/PHP/userprofile.php";

    useEffect(() => {
        axios.get(urldata, { withCredentials: true })
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
                setData(responseData);
                if(response.data.status === 'success'){
                    console.log('lezgo');
                }
            
            })
            .catch(err => {
                console.log(err);
            });
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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const [fname, setFname] = useState('');

    useEffect(() => {
        const storedFname = localStorage.getItem('fname');
        if (storedFname) {
            setFname(JSON.parse(storedFname));
        }
    }, []);




    return (
        <div className="header">
            <div className="col" id="left-section">
            <img id="logo" src="http://localhost/AdoptionWebsite/uploads/PawsitiveConnections.png" alt="Logo"/>
            </div>

            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

            <div className="navbar">
                <ul>
                    <li className='SL'><Link to="">{data.fname} {data.lname}</Link></li>
                    <li><Link to="/Homepage">Home</Link></li>
                    <li><Link to="/Adoptpet">Adopt Pet</Link></li>
                    <li><Link to="">Community</Link></li>
                    <li className="profile" onClick={toggleDropdown}>
                        Profile
                        {dropdownOpen && (
                                <ul className="profile-dropdown"> 
                                    <li><Link to="/UserProfile">{data.fname} {data.lname}</Link></li>
                                    <li><Link to="/ManageListings">Manage Listings</Link></li>
                                    <li onClick={handleLogOut}><Link to="/">LogOut</Link></li>
                                </ul>
                        )}
                    </li>
                    <li className='SL'><Link>Settings</Link></li>
                    <li className='SL'  onClick={handleLogOut}><Link to="/">LogOut</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
