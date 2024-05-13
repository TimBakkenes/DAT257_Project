import React, { useState } from 'react';
import '../App.css';
import profileImage from './profile.jpeg'; 

export function ProfileSlideOut({ isVisible, user }) {
   
    return (
        <div className={`profile-container ${isVisible ? 'show' : ''}`}>
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
        </div>
    );
}
