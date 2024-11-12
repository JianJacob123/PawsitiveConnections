import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import './css/PetDetails.css';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PetDetails = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const urldata = `http://localhost/AdoptionWebsite/PHP/PetDetails.php?id=${id}`;

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


    return (
        <div>
            <Header/>

            <div className="pet-details-container">
                <div className="pet-details-card">
                    <div className="back-to-listings">
                    <Link to="/AdoptPet" className="link">
                    <FaArrowLeft />
                    <h3>Back to Listings</h3>
                    </Link>
                    </div>
                    <div className="pet-details-content-wrapper">
                    <img className="pet-profile" src={data.images_url}></img>
                        <div className="pet-details-content-main">
                        <h2>{data.pet_name}</h2>
                        <p>{data.breed} | {data.age} Years Old</p>
                        </div>


                    <img className="add-pics" src={data.images_url}></img>
                    </div>

                <div className="additional-info">
                    <div className="description">
                    <h2>Description</h2>
                    <p>{data.description}</p>
                    </div>

                    <div className="pet-details-content">
                        <h2>Additional Details</h2>
                        <p>Gender: {data.gender}</p>
                        <p>Location: {data.address}</p>
                        <p>Owner: {data.fname} {data.lname}</p>
                        </div>
                </div>

                <div className="pet-details-button">
                    <button>Adopt Me!</button>

                </div>
                </div>
                
            </div>

        </div>
    );
}

export default PetDetails
