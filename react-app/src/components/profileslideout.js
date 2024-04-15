import React, { useState } from 'react';
import '../App.css';
import profileImage from './profile.jpeg'; 


export function ProfileSlideOut({isVisible}) {
    const userInfo = {
        username: "JohnDoe",
        email: "johndoe@example.com",
        image: profileImage
    };

    return (
        <div className={`profile-container ${isVisible ? 'show' : ''}`}>
            <img src={userInfo.image} alt="Profile" className="profile-image"/>
            <h2>{userInfo.username}</h2>
            <p>{userInfo.email}</p>
        </div>
    );
}
