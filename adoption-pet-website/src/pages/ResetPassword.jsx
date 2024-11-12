import React, { useState } from 'react';
import './css/ForgotPassword.css'; // Reusing the CSS file for styling

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Fetch token from URL
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    // Handle form submission
    const handlePasswordReset = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setIsError(true);
            return;
        }

        if (!token) {
            setMessage('Invalid or missing token.');
            setIsError(true);
            return;
        }

        fetch('http://localhost/AdoptionWebsite/PHP/ResetPassword.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ token: token, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
            setIsError(data.status !== 'success');
            if (data.status === 'success') {
                setTimeout(() => {
                    window.location.href = '/'; 
                }, 3000);
            } else {
                
                setTimeout(() => setMessage(''), 5000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
            setIsError(true);
        });
    };

    const handleCloseMessage = () => setMessage('');

    return (
        <div className="F-container">
            <div className="I-container">
                <h2>Reset Password</h2>
                <form onSubmit={handlePasswordReset}>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="send-button" type="submit">Reset Password</button>
                </form>
                {message && (
                    <div className={isError ? "error-message" : "success-message"}>
                        {message}
                        <button className="close-button" onClick={handleCloseMessage}>&times;</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
