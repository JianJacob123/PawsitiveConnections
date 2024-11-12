import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const LoginForm = () => {
    // FOR REGISTER
    const [action, setAction] = useState('');
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pass, setPass] = useState("");
    const [capVal, setCapVal] = useState(""); // CAPTCHA value state
    
    // FOR LOG IN
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const navigate = useNavigate();

        const [alertMessage, setAlertMessage] = useState(null);  // State for alert message
    const [alertType, setAlertType] = useState(""); 

    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passError, setPassError] = useState("");
    const [capError, setCapError] = useState(""); // CAPTCHA error state

    // FOR REGISTRATION
    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        setFnameError("");
        setLnameError("");
        setEmailError("");
        setPhoneError("");
        setPassError("");  // Reset password error state

        // Validation
        if (!/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(fname.trim())) {
            setFnameError("Names can only contain letters and spaces between words.");
            return;
        }

        if (!/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/.test(lname.trim())) {
            setLnameError("Names can only contain letters and spaces between words.");
            return;
        }

        if (!/^\d+$/.test(phone)) {
            setPhoneError("Phone numbers can only contain digits.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        // Password length check
        if (pass.length < 6) {
            setPassError("Password must be at least 6 characters long.");
            return;
        }

        const urlregister = "http://localhost/AdoptionWebsite/PHP/server.php";

        let fData = new FormData();
        // REGISTER
        fData.append('fname', fname);
        fData.append('lname', lname);
        fData.append('address', address);
        fData.append('email', email);
        fData.append('pass', pass);
        fData.append('phone', phone);

        axios.post(urlregister, fData)
        .then(response => {
            alert(response.data); 
            // Clear input if success
            if (response.data.includes("Success")) {
                setFname(''); 
                setLname(''); 
                setEmail(''); 
                setPass(''); 
                setPhone('');
                setAddress('');
            }
        })
        .catch(error => alert(error));
    };

    // FOR LOG IN
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const urllogin = "http://localhost/AdoptionWebsite/PHP/login.php";
        let fData = new FormData();

        // Check if CAPTCHA is completed
        if (!capVal) {
            setCapError("Please complete the CAPTCHA.");
            return; 
        } else {
            setCapError(""); 
        }

        // LOGIN
        fData.append('loginEmail', loginEmail);
        fData.append('loginPass', loginPass);

        axios.post(urllogin, fData, { withCredentials: true })
        .then(response => {
            if (response.data.status === "success"){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('fname', JSON.stringify(response.data.fname));
                
                if (loginEmail === 'admin@gmail.com' && loginPass === 'admin123'){
                    console.log("Login successful, attempting to navigate to admin page");
                    navigate('/admin');
                } else {
                    console.log("Login successful, attempting to navigate to homepage");
                    navigate('/homepage');
                }

                setAlertMessage("Login successful!");
                setAlertType('success');
                
            } else {
                setAlertMessage(response.data.message || "Login failed");
                setAlertType('error');
            }
        })
        .catch(error => {
            console.error('Error occurred during login:', error);
            setAlertMessage('Login failed. Please try again.');
            setAlertType('error');
        });


        setTimeout(() => {
            setAlertMessage(null);
            setAlertType('');
        }, 5000);
    };

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    return (
        <div className={`wrapper loginform ${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLoginSubmit}>
                    <h1>LOG IN</h1>
                    <div className="underline"></div>

                    {/* Email */}
                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Email'
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    {emailError && <div className="error-message">{emailError}</div>}

                    {/* Password */}
                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Password'
                            value={loginPass}
                            onChange={(e) => setLoginPass(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <Link to ="/ForgotPass"><a>Forgot password</a></Link>
                    </div>

                    <ReCAPTCHA 
                        className="captcha"  
                        sitekey="6LcB4HkqAAAAAFgBF4HAQzLpMbkUX-7W5u5Ea3ie" 
                        onChange={val => setCapVal(val)} 
                    />

                    {capError && <div className="error-message">{capError}</div>}  {/* Display CAPTCHA error */}

                    {/* Submit Login Button */}
                    <button type='submit' id='login' disabled={!capVal}>Login</button>

                    <div className="register">
                        <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className={`alert ${alertType === "error" ? "alert-danger" : "alert-success"}`}>
            {alertMessage}
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegisterSubmit}>
                    <h1>REGISTER</h1>
                    <div className="underline"></div>

                    {/* First Name */}
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='First Name'
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    {fnameError && <div className="error-message">{fnameError}</div>}

                    {/* Last Name */}
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Last Name'
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    {lnameError && <div className="error-message">{lnameError}</div>}

                    {/* Address */}
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <FaHouse className='icon' />
                    </div>

                    {/* Phone */}
                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <FaPhoneAlt className='icon' />
                    </div>
                    {phoneError && <div className="error-message">{phoneError}</div>}

                    {/* Email */}
                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <MdEmail className='icon' />
                    </div>
                    {emailError && <div className="error-message">{emailError}</div>}

                    {/* Password */}
                    <div className='input-box'>
                        <input
                            type='password'
                            placeholder='Password'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    {passError && <div className="error-message">{passError}</div>}

                    {/* Submit Register Button */}
                    <button type='submit' id='register'>Register</button>

                    <div className="register">
                        <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
