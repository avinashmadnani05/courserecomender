import React from 'react';
import { Link } from 'react-router-dom';
import NavbarHome from '../components/NavbarHome';
import '../styles/HomePage.css';
import Footer from '../components/Footer';
function Home() {


  return (
    <>

    <NavbarHome/>

    <h1>Welcome to Course Recommender</h1>



    <h2>Course Recommender</h2>
    <Footer/>
    </>
  );
}

export default Home;
