import React from 'react';
import '../App.css'; 

import { useState } from 'react';

export function Contact() {
    
    const [members] = useState([
        {
            name: "Julia Malmborg",
            email: "juliamal@chalmers.se",
            description: "Front-end Developer"
          },
          {
            name: "Elvira Moberg",
            email: "elviram@chalmers.se",
            description: "Front-end Developer"
          },
          {
            name: "Viktoria Andersson",
            email: "vianders@chalmers.se",
            description: "Front-end Developer"
          },
          {
            name: "Elina Norling",
            email: "elinano@chalmers.se",
            description: "Front-end Developer"
          },
          {
            name: "Agnes Magnusson",
            email: "agnesmag@chalmers.se",
            description: "Back-end Developer"
          },
          {
            name: "Axel Gustavsson",
            email: "axelgust@chalmers.se",
            description: "Back-end Developer"
          },
          {
            name: "Tim Bakkenes",
            email: "bakkenes@chalmers.se",
            description: "Back-end Developer"
          },
          {
            name: "Anton Johansson",
            email: "antu@chalmers.se",
            description: "Scrum Master"
          }
    ]);


  
    return (
    <div className="stores-wrapper">
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', whiteSpace:'nowrap' }}>
            
            <h1 className="fact-page-heading">Contact us</h1>
        </div>

      <div className="members-container">
        {members.map((member, index) => (
          <div key={index} className="store">
            <h2>{member.name}</h2>
            <p> {member.description}</p>
            <a href={`mailto:${member.email}`}>{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
}