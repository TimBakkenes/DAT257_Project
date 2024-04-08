import React from 'react';
import "./css/Header.css"; // make sure the path is correct

export function Header({ navigateHome, toggleFavorites, navigateFactPage, navigateProfilePage }) {
    return (
        <div className="fixed-header">
          <button
                className="header-button home-button"
                onClick={navigateHome}
                aria-label="Home" // Accessibility label
            />
            <button
                className="header-button favorites-button"
                onClick={toggleFavorites}
                aria-label="Favorites" // Accessibility label
            />
            <button
                className="header-button fact-button"
                onClick={navigateFactPage}
                aria-label="Fact" // Accessibility label
            />
            <button
                className="header-button login-button"
                onClick={navigateProfilePage}
                aria-label="Login" // Accessibility label
            />
        </div>

    );
}