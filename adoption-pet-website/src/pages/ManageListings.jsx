import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './css/ManageListings.css';
import { CgProfile } from "react-icons/cg";


const ManageListings = () => {

    const urldata = "http://localhost/AdoptionWebsite/PHP/ManageListings.php";
    const [data, setData] = useState([]); 
    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [listID, setListID] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

    const toggleModal = (listId) => {
        setListID(listId);
        setModal(true);
    }

    const closeModal = () => {
        setListID(null);
        setModal(false);
    }

    const handleSearch = () => {
        if (search.trim() === '') {
            setFilteredUsers([]); // If search is empty, don't show anything
        } else {
            const filtered = users.filter((item) =>
                item.fname.toLowerCase().includes(search.toLowerCase()) ||
                item.lname.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(filtered); // Set the filtered users
        }
    };

    useEffect(() => {
        axios.get(urldata, { withCredentials: true })
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                const responseusers = Array.isArray(response.data.users) ? response.data.users : [response.data.users];
                setData(responseData);
                setUsers(responseusers);

                if(response.data.status === 'success'){
                    console.log('lezgo');
                }

            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const markadopted = (userId) => {
        if (listID) {
            axios.post(urldata, {
                list_id: listID,
                user_id: userId,
                date: formattedDate
            })
            .then(response => {
                if(response.data.status === "success"){
                    alert(response.data.message)
                    setModal(false); // Close the modal after success
                }
            })
            .catch(error => {
                console.error('Error marking as adopted:', error);
                // Handle error
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="manage-list-wrapper">
            <h2>Your Listings</h2>
            </div>
            <div className="manage-list-container">
                {data.map((item) => (
                    <div className="manage-list-card" key={item.list_id}>
                    <img src={item.images_url} alt="picture"></img>
                    <h3>{item.pet_name}</h3>
                    <p>Date Listed: {item.listing_date}</p>
                    <p>Status: <strong>{item.list_status}</strong></p>
                    <button className="manage-list-button" onClick={()=>toggleModal(item.list_id)}>Mark As Adopted</button>
                </div>
                ))}
            </div>
            {modal && (
                <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h3>Who Adopted Your Pet?</h3>
                    <input type="text" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    <button onClick={handleSearch}>Search</button>
                    {filteredUsers.map((item) => (
                        <div className="modal-users" key={item.user_id}>
                        <h5>ID: {item.user_id} | {item.fname} {item.lname}</h5>
                        <button onClick={()=>markadopted(item.user_id)}>Select</button>
                        </div>
                    ))}
                </div>
            </div>
            )}

        </div>
    );
}

export default ManageListings;
