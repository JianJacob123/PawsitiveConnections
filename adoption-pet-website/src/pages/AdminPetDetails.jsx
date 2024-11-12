import AdminSbar from '../components/AdminSbar'
import React, { useState, useEffect } from 'react';
import './css/AdminPetDetails.css';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminPetDetails = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const urldata = `http://localhost/AdoptionWebsite/PHP/AdminPetDetails.php?id=${id}`;

    useEffect(() => {

        axios.get(urldata)
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data; // Extract the first item if it's an array; // Assuming this is the single object
                setData(responseData);
            })
            .catch(err => {
                console.log(err);
            });
    }, [urldata]);

    const approved = () => {
        axios.patch(urldata , {
            listid: id,
            updatedfield: 'approved'
        })
        .then(response => {
            console.log(response.data);
            if(response.data.status === "success"){
                alert(response.data.message);
            }
        })
        .catch(error => {
            console.error("There was an error", error);
        });
    }

    const denied = () => {
        axios.patch(urldata , {
            listid: id,
            updatedfield: 'denied'
        })
        .then(response => {
            if(response.data.status === "success"){
                alert(response.data.message);
            }
        })
        .catch(error => {
            console.error("There was an error", error);
        });
    }


    return (
        <div>
            <AdminSbar/>

            <div className="admin-pet-details-container">
                <div className="admin-pet-details-card">
                    <div className="back-to-listings">
                    <Link to="/PetList" className="admin-link">
                    <FaArrowLeft />
                    <h3>Back to Listings</h3>
                    </Link>
                    </div>
                    <div className="admin-pet-details-content-wrapper">
                    <img className="admin-pet-profile" src={data.images_url}></img>
                        <div className="admin-pet-details-content-main">
                        <h2>{data.pet_name}</h2>
                        <p>{data.breed} | {data.age} Years Old</p>
                        </div>


                    <img className="admin-add-pics" src={data.images_url}></img>
                    </div>

                <div className="admin-additional-info">
                    <div className="admin-description">
                    <h2>Description</h2>
                    <p>{data.description}</p>
                    </div>

                    <div className="admin-pet-details-content">
                        <h2>Additional Details</h2>
                        <p>Gender: {data.gender}</p>
                        <p>Location: {data.address}</p>
                        <p>Owner: {data.fname} {data.lname}</p>
                        </div>
                </div>

                <div className="admin-pet-details-button">
                    <Link to="/PetList">
                    <button onClick={approved}>Approved</button>
                    </Link>
                    <Link to="/PetList">
                    <button onClick={denied}>Denied</button>
                    </Link>
                </div>
                </div>
                
            </div>

        </div>
    );
}

export default AdminPetDetails
