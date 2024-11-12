import React, { useEffect, useState }from 'react'
import AdminSbar from '../components/AdminSbar'
import './css/PetList.css'
import axios from 'axios';
import { Link } from 'react-router-dom';



    const PetList = () => {

    const [data, setData] = useState([]);
    const [type, setType] = useState("dog");
    const urldata = "http://localhost/AdoptionWebsite/PHP/PetList.php";

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
        <div className='Petlist-container'>
            <AdminSbar />

            <div className="PetList-main-container">
                <h1>PET LIST APPROVAL</h1>
                <select name="position" className="pet-select" value={type} onChange={(e) =>setType(e.target.value)}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="chicken">Chicken</option>
        </select>
                
                {data.filter((item) => {
            const matchedType = item.animal_type === type;
            return matchedType;
        }).map(item => (
            <div className="pl-card-container">
            <div className="petli-card" key={item.list_id}>
            <h4 className='Pl-title'>For Approval</h4>
            <img src={item.images_url} className="pl-pet-img" alt="..."/>
            <h3>{item.pet_name}</h3>
            <p>Owner: {item.fname} {item.lname}</p>
            <p>Status: {item.is_approved}</p>
            <div className="pl-card-btn">
            <Link to={`/AdminPetDetails/${item.list_id}`}>
            <button>View Details</button>
            </Link>
            </div>
            </div>
            
        </div>
            ))}
                

                </div>

    </div>
    )
    }

export default PetList
