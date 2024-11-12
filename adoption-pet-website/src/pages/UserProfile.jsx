import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './css/userprofile.css';
import { CgProfile } from "react-icons/cg";


const UserProfile = () => {

    const urldata = "http://localhost/AdoptionWebsite/PHP/userprofile.php";
    const [data, setData] = useState({}); 
    const [petlist, setPetList] = useState([]);

    useEffect(() => {
        axios.get(urldata, { withCredentials: true })
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
                const petlistings = Array.isArray(response.data.list) ? response.data.list : [response.data.list];
                setData(responseData);
                setPetList(petlistings);

                if(response.data.status === 'success'){
                    console.log('lezgo');
                }

            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Header />
            <div className="profile-container">
                <div className="P-info">
                    <div className="top">
                        <CgProfile className="profile-icon" />
                        <div>
                            <p className="info-line-name"><strong>{data.fname} {data.lname}</strong></p>
                            <p className="info-line">{data.address} | {data.phone}</p>
                            <p className="info-line">Application Status: <strong>{data.application_status ? data.application_status : "Not yet filled up"}</strong></p>
                        </div>
                    </div>
                    
                    <div className="bottom">   
                        <h2>Your Listings</h2>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Pet Name</th>
                                        <th>List Date</th>
                                        <th>List Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {petlist.map((item) => (
                                        <tr key={item.list_id}>
                                        <td>{item.list_id}</td>
                                        <td>{item.pet_name}</td>
                                        <td>{item.listing_date}</td>
                                        <td>{item.is_approved}</td>
                                    </tr>
                                    ))}
        
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
