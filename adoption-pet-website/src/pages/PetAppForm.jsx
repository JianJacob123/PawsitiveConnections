import React, { useState, useEffect } from 'react';
import './css/PetAppForm.css';
import Header from '../components/Header';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PetAppForm = () => {
    const [date, setDate] = useState("");
    const [petname, setPetName] = useState("");
    const [animaltype, setAnimalType] = useState("");
    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const urlApplication = "http://localhost/AdoptionWebsite/PHP/PetAppForm.php"


    const handlePetApplicationSubmit = (e) => {
        e.preventDefault("");

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);

        const urlApplication = "http://localhost/AdoptionWebsite/PHP/PetAppForm.php"

        let fData = new FormData();

        fData.append('petname', petname);
        fData.append('animaltype', animaltype);
        fData.append('breed', breed);
        fData.append('gender', gender);
        fData.append('age', age);
        fData.append('size', size);
        fData.append('color', color);
        fData.append('description', description);
        fData.append('date', formattedDate);
        fData.append('image', image);

        axios.post(urlApplication, fData, { withCredentials: true })
        .then(response => {
            if (response.data.status === "success") {
                alert('Form Successfully Submitted');
                console.log(response.data.message);
            }
        })
        .catch(error => alert(error));
    };
    return (
        <div>
            <Header />
            <div className="ApplicationF-container">
                <div className="adoption-form">
                    <h2>List A Pet</h2>
                    <h4>Pet Information</h4>
                    <form onSubmit={handlePetApplicationSubmit}>
                        <div className='input-field'>
                            <input type="text"  placeholder='Pet Name' value={petname} onChange={(e) => setPetName(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         </select>
                        </div>
                        <div className='input-field'>
                            <input type="text"  placeholder='Breed'value={breed} onChange={(e) => setBreed(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="number"  placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}required />
                        </div>
                        <div className='input-field'>
                        <select value={animaltype} onChange={(e) => setAnimalType(e.target.value)}>
                         <option value="dog">Dog</option>
                         <option value="cat">Cat</option>
                        <option value="rabbit">Rabbit</option>
                        <option value="chicken">Chicken</option>
                         </select>
                        </div>
                        <div className='input-field'>
                        <select value={size} onChange={(e) => setSize(e.target.value)}>
                         <option value="small">Small</option>
                         <option value="medium">Medium</option>
                        <option value="large">Large</option>
                         </select>
                        </div>
                        <div className='input-field'>
                            <input type="text"  placeholder='Color' value={color} onChange={(e) => setColor(e.target.value)} required />
                        </div>
                        <div className='input-field'>
                            <input type="file" placeholder='image' className="file-input" onChange={(e) => setImage(e.target.files[0])} required />
                        </div>
                        <div className='input-field'>
                            <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className='input-field-btn'>
                            <button type="submit">Submit</button>
                            <button>Back</button>
                        </div>

                        {/* Add more fields as necessary */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PetAppForm;
