import React from 'react';
import "./css/Header.css"; // make sure the path is correct

export function Header({toggleFavorites, toggleFactpage, navigateProfilePage, toggleContact }) {
    return (

        <div className="fixed-header">
          {/* <button
                className="header-button map-button"
                onClick={toggleMap}
                aria-label="Map" // Accessibility label
            /> */}
            <button
                className="header-button favorites-button"
                onClick={toggleFavorites}
                aria-label="Favorites" // Accessibility label
            />
            <button
                className="header-button fact-button"
                onClick={toggleFactpage}
                aria-label="Fact" // Accessibility label
            />
            <button
                className="header-button profile-button"
                onClick={navigateProfilePage}
                aria-label="Profile" // Accessibility label
            />
            <button
                className="header-button contact-button"
                onClick={toggleContact}
                aria-label="Contact" // Accessibility label
            />
        </div>

    );
}