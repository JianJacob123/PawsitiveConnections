import React, { useEffect, useState }from 'react'
import AdminSbar from '../components/AdminSbar'
import './css/ApplicationDetails.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ApplicationDetails = () => {

    const [data, setData] = useState({});
    const { id } = useParams(); 

    
    const urldata = `http://localhost/AdoptionWebsite/PHP/ApplicationDetails.php?id=${id}`;

    useEffect(() => {

        axios.get(urldata)
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
                setData(responseData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const approved = () => {
        axios.patch(urldata , {
            appid: id,
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
            appid: id,
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
        <div className='AdoptionA-Container'>
            <AdminSbar />
            <div className="appdetails-main-content">
                <h1>APPLICATION VERIFICATION</h1>
                <div className="app-detail-container">
                    <div className="adopter-info">
                    <h3>Application Details</h3>
                    <p>Application ID: {data.application_id}</p>
                    <p>Application Date: {data.application_date}</p>
                    <p className='title-status' >Status : <p className='status' >{data.application_status}</p> </p>
                    </div>
                    <div className="adopter-info">
                    <h3>Adopter Info</h3>
                    <p>Name: {data.fname} {data.lname}</p>
                    <p>Address: {data.address}</p>
                    <p>Phone: {data.phone}</p>
                    <p>Occupation: {data.occupation}</p>
                    <p>Salary Per Month: {data.salary}</p>
                    </div>

                    <div className="adopter-info">
                    <h3>Residence</h3>
                    <p>Type: {data.residence_type}</p>
                    <p>Owns or Rents: {data.owns_or_rents}</p>
                    </div>

                    <div className="adopter-info">
                    <h3>Other Details</h3>
                    <p>Previous Owner: {data.previous_pet_ownership ? 'Yes' : 'No' }</p>
                    <p>Long Term Commitment: {data.long_term_commitment ? 'Yes' : 'No'}</p>
                    <p>Motivation: {data.motivation}</p>
                    </div>
                    <Link to="/AdoptionA">
                    <button className="app-btn" onClick={approved}>Approve</button>
                    </Link>
                    <Link to="/AdoptionA">
                    <button className="app-btn" onClick={denied}>Not Approve</button>
                    </Link>
                </div>
                
            </div>

        </div>
        
    )
}

export default ApplicationDetails
