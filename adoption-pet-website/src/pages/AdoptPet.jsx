import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import './css/AdoptPet.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdoptPet = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState("dog");
    const [location, setLocation] = useState('');
    const urldata = "http://localhost/AdoptionWebsite/PHP/AdoptPet.php";

    useEffect(() => {

        axios.get(urldata)
            .then(response => {
                const responseData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                setData(responseData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    

    
    return (
        <div>
            <section>
            <Header/>
            </section>

        <div className="petlist-wrapper">
        <div className="pet-filter">
        <select name="position" className="pet-select" value={type} onChange={(e) =>setType(e.target.value)}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="chicken">Chicken</option>
        </select>

        <input type="text" className="location-text" placeholder="Enter Location" onChange={(e) => setLocation(e.target.value)}></input>
        </div>

        <div className="pet-cards-container">

        
        {data.filter((item) => {
            const matchedType = item.animal_type === type;
            const matchedLocation = item.address.toLowerCase().includes(location.toLowerCase());
            return matchedType && matchedLocation;
        }).map(item => (
                <div className="pet-card" key={item.list_id}>
                    <Link to={`/PetDetails/${item.list_id}`}>
                    <img src={item.images_url} alt="picture"></img>
                    <h2>{item.pet_name}</h2>
                    <p>Age: {item.age}</p>
                    <p>Breed: {item.breed}</p>
                    <p>Address: {item.address}</p>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    </div>
    );
}

export default AdoptPet
