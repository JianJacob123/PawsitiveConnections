import React, { useState } from 'react';
import './css/ForgotPassword.css';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Clear error on input change
        setSuccess(''); // Clear success message on input change
    };

    const handleSendClick = () => {
        // Simple email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Send POST request to the PHP backend to process the email
        fetch('http://localhost/AdoptionWebsite/PHP/ForgotPassword.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ email }), // Send email as URL-encoded string
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                setSuccess(data.message); // Set success message
            } else {
                setError(data.message); // Set error message
            }

            // Clear messages after 5 seconds
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again later.');
        });
    };

    const handleCloseError = () => setError('');
    const handleCloseSuccess = () => setSuccess('');

    return (
        <div>
            <div className="F-container">
                <div className="I-container">
                    <h2>Forgot Password</h2>
                    <p>Enter your email address</p>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email} 
                        onChange={handleEmailChange} 
                    />
                    <button className="send-button" onClick={handleSendClick}>Send</button>

                    {error && (
                        <div className="error-message">
                            {error}
                            <button className="close-button" onClick={handleCloseError}>&times;</button>
                        </div>
                    )}

                    {success && (
                        <div className="success-message">
                            {success}
                            <button className="close-button" onClick={handleCloseSuccess}>&times;</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
