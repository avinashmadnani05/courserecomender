import React, { useState } from "react";
import "../styles/NavbarHome.css";
import { Home, UserPlus, LogIn, Users, Mail, Sun, Moon } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
const NavbarHome = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "light-mode" : "dark-mode";
  };
  const Linktosignup = () => {
    window.location.href = "/signup";
  }
    const Linktologin = () => {
        window.location.href = "/login";
    }
    const Linktocreators = () => {
        window.location.href = "/creators";
    }
    const LinktocontactUs = () => {
        window.location.href = "/contactUs";
    }
   
    
  return (
    <>
  
    <div className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="icon">
        <Home size={24} />
        <Link to="/"></Link>
      </div>
      <div className="icon" onClick={Linktosignup}>
        <UserPlus size={24} />
        <Link to="/signup"></Link>
      </div>
      <div className="icon" onClick={Linktologin}>
        <LogIn size={24} />
      </div>
      <div className="icon"onClick={Linktocreators}>
        <Users size={24} />
      </div>
      <div className="icon" onClick={LinktocontactUs}>
        <Mail size={24} />
      </div>
      <div className="icon theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </div>
    </div>
    </>
  );
};

export default NavbarHome;
