import React from "react";
import "../styles/creators.css"; // Import the stylesheet
import avinash from "../styles/avinash.jpg";
import arushi from "../styles/arushi.jpeg";
const creators = [
  {
    name: "Avinash Madnani",
    info: "Full-stack developer and project lead.",
    linkedin: "https://www.linkedin.com/in/avinash-madnani/",
    instagram: "https://www.instagram.com/avinashmadnani/",
    github: "https://github.com/avinashmadnani",
    image: avinash, // Avinash's image
  },
  {
    name: "Anushka Zade",
    info: "Front-end developer with expertise in design.",
    linkedin: "https://www.linkedin.com/in/anushka-zade/",
    instagram: "https://www.instagram.com/anushkazade/",
    github: "https://github.com/anushkazade",
    image: "path/to/anushka_image.jpg", // Replace with actual image path
   },
  {
    name: "Arushi Meshram",
    info: "Back-end developer specializing in databases.",
    linkedin: "https://www.linkedin.com/in/arushi-meshram/",
    instagram: "https://www.instagram.com/arushimeshram/",
    github: "https://github.com/arushimeshram",
    image: arushi, // Replace with actual image path
   },
];

const Creators = () => {
  return (
    <div className="creators-container">
      {creators.map((creator) => (
        <div className="creator-card" key={creator.name}>
          <div className="image-container">
            <img src={creator.image} alt={creator.name} className="creator-image" />
            <div className="hover-info">
              <h3>{creator.name}</h3>
              <p>{creator.info}</p>
              <div className="social-links">
                <a href={creator.linkedin} target="_blank" rel="noopener noreferrer" className="social-button linkedin">
                  LinkedIn
                </a>
                <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="social-button instagram">
                  Instagram
                </a>
                <a href={creator.github} target="_blank" rel="noopener noreferrer" className="social-button github">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Creators;
