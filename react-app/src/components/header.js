import React from 'react';
import ".//css/Header.css"


export function Header({ toggleFavorites , navigateLoginPage, navigateAboutPage, toggleFactpage}) {
    return (
      <div className="fixed-header">
        {/* Här kan man lägga till och ta bort knappar från headern */}

        <button className="leftbutton" onClick={toggleFavorites}>
            Favorites
          </button>
        
        <button className="leftbutton" onClick={toggleFactpage} >
            Fact Page
        </button>
        
        <button onClick={navigateLoginPage} >
            Login
        </button>

        <button onClick={navigateAboutPage} >
            About
        </button>
        
          
     
      </div>
    );
  }