import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FiSend } from "react-icons/fi";
import "./css/message.css";
import Pusher from 'pusher-js';

const Message = () => {
    const [messages, setMessages] = useState([]); // Array to hold messages
    const [message, setMessage] = useState(""); // Current input message

    const handleSendMessage = async () => {
        if (message.trim()) {
            // Send message to the backend
            await fetch('http://localhost:5000/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
    
            // Clear input after sending
            setMessage('');
        }
    };

    const uniqueMessages = messages.filter(
        (value, index, self) => self.indexOf(value) === index
    );

    useEffect(() => {
        const pusher = new Pusher('77c53666ec2e4691180c', {
            cluster: 'ap1',
        });

        // Subscribe to the 'chat' channel
        const channel = pusher.subscribe('chat');

        // Listen for the 'new-message' event
        channel.bind('new-message', (data) => {
            // Append new message to the state
            setMessages((prevMessages) => [...prevMessages, { ...data.message, isSent: false }]); // Ensure isSent is set
            setMessage("");
        });

        // Clean up on unmount
        return () => {
            pusher.unsubscribe('chat');
        };
    }, []);

    return (
        <div>
            <div className="messageContainer">
                <Header />
                <div className="message">
                    <h2>User Name</h2>
                    <div>
                        <h4>Messages:</h4>
                        <div className="messageList">
                            {uniqueMessages.length === 0 ? (
                                <p>No message yet</p>
                            ) : (
                                uniqueMessages.map((msg, index) => (
                                    <div 
                                        key={index} 
                                        className={msg.isSent ? 'sentMessage' : 'receivedMessage'}
                                    >
                                        {msg.text}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    
                    <div className='input-mssg'>
                        <input
                            type="text"
                            value={message}
                            placeholder='Enter Message'
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <button onClick={handleSendMessage}><FiSend /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
