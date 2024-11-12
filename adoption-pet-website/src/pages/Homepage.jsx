import Header from '../components/Header';
import React, { useState, useEffect } from 'react';
import './css/Home.css';
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [fname, setFname] = useState('');

    useEffect(() => {
        const storedFname = localStorage.getItem('fname');
        if (storedFname) {
            setFname(JSON.parse(storedFname));
        }
    }, []);

    return (
        <div>
            <Header/>

                <div className="Top-page">

                <h2 className='welcome-msg'>Welcome, {fname}</h2>
                <div className="cards-container">
                    
                    <div className="cards-find">
                        <Link to="/AdoptPet">
                        <FaMagnifyingGlassLocation className="btn-icon"/>
                        <span><h3>I Want to Adopt a Pet</h3></span>
                        <span><p>Search for available pets</p></span>
                        </Link>
                    </div>

                    <div className="cards-adopt">
                        <Link to="/PetAppForm">
                        <GiDogHouse className="btn-icon"/>
                        <h3>I need my pet adopted</h3>
                        <p>No worries, Let's Get Started!</p>
                        </Link>
                    </div>
                </div>
                </div>
                

    <section>
<div className="about-wrapper">

    <h2 className="about-label" id="about">About Us</h2>

        <div className="about-container">

            <div className="about-card">
                <h2><strong>CONTENT HERE</strong></h2>
                <p>Hover For More Info</p>
                <div className="about-card-content">
                    <p>Summary</p>
                    <a href="">Explore</a>
                </div>
            </div>

            <div className="about-card">
                <h2><strong>CONTENT HERE</strong></h2>
                <p>Hover For More Info</p>
                <div className="about-card-content">
                    <p>Summary</p>
                    <a href="">Explore</a>
                </div>
            </div>

            <div className="about-card">
                <h2><strong>CONTENT HERE</strong></h2>
                <p>Hover For More Info</p>
                <div className="about-card-content">
                    <p>Summary</p>
                    <a href="">Explore</a>
                </div>
            </div>
        </div>
    </div>
    </section>

    <section>
    </section>

        </div>
    );
}

export default Homepage
