import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import './css/AdoptionForm.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdoptionForm = () => {
    const [date, setDate] = useState("");
    const [occupation, setOccupation] = useState("");
    const [salary, setSalary] = useState("");
    const [residencetype, setResidenceType] = useState("");
    const [homeorrent, setHomeOrRent] = useState("");
    const [prevownership, setPrevOwnership] = useState("");
    const [longtermcommitment, setLongTermCommitment] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState({});
    const urlApplication = "http://localhost/AdoptionWebsite/PHP/AppForm.php"



    useEffect(() => {

        axios.get(urlApplication, { withCredentials: true })
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data; // Extract the first item if it's an array;
                setData(responseData);
            })
            .catch(err => {
                console.log(err);

            });
    }, [urlApplication]);

    console.log(data);


    const handleApplicationSubmit = (e) => {
        e.preventDefault("");

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);

        const urlApplication = "http://localhost/AdoptionWebsite/PHP/AppForm.php"

        let fData = new FormData();

        fData.append('occupation', occupation);
        fData.append('salary', salary);
        fData.append('residencetype', residencetype);
        fData.append('homeorrent', homeorrent);
        fData.append('prevownership', prevownership);
        fData.append('longtermcommitment', longtermcommitment);
        fData.append('description', description);
        fData.append('date', formattedDate);

        axios.post(urlApplication, fData, { withCredentials: true })
        .then(response => {
            if (response.data.status === "success") {
                alert('Form Successfully Submitted');
            }
        })
        .catch(error => alert(error));
    };

    return (
        <div>
            <Header/>
        
        <form className="form-wrapper" onSubmit={handleApplicationSubmit}>
            <fieldset className="adoption-form-info">
                
                <h2>Adoption Form</h2>
                <div className="adoption-form-personalinfo">
                <h3>Personal Information</h3>

                <div className="personal-info-input">
                <input type="text" placeholder="Name"  disabled value={data.fname + ' ' + data.lname}></input>
                <input type="text" placeholder="Address"  disabled value={data.address}></input>
                </div>

                <div className="personal-info-input">
                <input type="text" placeholder="Phone No." value={data.phone} disabled></input>
                <input type="text" value={residencetype} onChange={(e) => setResidenceType(e.target.value)} placeholder="Residence Type (e.g Bungalow, Apartment)"></input>
                </div>

                <div className="personal-info-input">
                <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Occupation"></input>
                <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary (Monthly)"></input>
                </div>

                </div>

                <div className="adoption-form-adoptinfo">

                <div className="adoption-info-input">
                <h3>Do you Own A Home or Rent?</h3>

                <div className="adoption-info-radio">
                <label>
                    Owns
                    <input type="radio" value="owns" onChange={(e) => setHomeOrRent(e.target.value)} name="homeOwnership"/>
                </label>

                <label>
                    Rents
                    <input type="radio" name="homeOwnership" value="rents" onChange={(e) => setHomeOrRent(e.target.value)} />
                </label>

                </div>


                <div className="adoption-info-input">
                    </div>
                <h3>Previous Pet Ownership?</h3>

                <div className="adoption-info-radio">
                <label>
                    Yes
                    <input type="radio" name="previousPet" value="1" onChange={(e) => setPrevOwnership(e.target.value)} />
                </label>

                <label>
                    No
                    <input type="radio" name="previousPet" value="0" onChange={(e) => setPrevOwnership(e.target.value)}/>
                </label>

                </div>

                </div>
                <div className="adoption-info-input">
                    <h3>Long Term Commitment?</h3>
                    
                <div className="adoption-info-radio">
                <label>
                    Yes
                    <input type="radio" name="longTermCommitment" value="1" onChange={(e) => setLongTermCommitment(e.target.value)} />
                </label>

                <label>
                    No
                    <input type="radio" name="longTermCommitment" value="0" onChange={(e) => setLongTermCommitment(e.target.value)}/>
                </label>
                </div>
                </div>
                <textarea className="motivation" rows="1" placeholder="Reason for Adopting" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                <div className="btn-submit">
                <button type="submit" >Submit</button>
                </div>
            </fieldset>
        </form>
        </div>
    );
}

export default AdoptionForm
