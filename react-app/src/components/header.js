import React from 'react';
import "./css/Header.css"; // make sure the path is correct
import { useNavigate } from 'react-router-dom'

export function Header({toggleFavorites, toggleFactpage, navigateProfilePage, toggleContact }) {

    const navigate = useNavigate();

    const logout = () => {
        navigate("/")
        window.location.reload()
    }

    return (

        <div className="fixed-header">
          
            <button
                className="header-button favorites-button"
                onClick={toggleFavorites}
                aria-label="Favorites" 
            />
            <button
                className="header-button fact-button"
                onClick={toggleFactpage}
                aria-label="Fact"
            />
            <button
                className="header-button profile-button"
                onClick={navigateProfilePage}
                aria-label="Profile"
            />
            <button
                className="header-button contact-button"
                onClick={toggleContact}
                aria-label="Contact"
            />

            <button
                className="log-out"
                onClick={logout}
            >Log Out</button>

        </div>

    );
}