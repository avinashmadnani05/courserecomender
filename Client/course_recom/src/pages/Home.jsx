import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';

// Dynamically import Lottie to avoid unnecessary load
const Lottie = lazy(() => import('lottie-react'));

// Importing the Lottie animation data separately to allow lazy load
const animationData = require('../styles/Animation - 1728897180138');

// Slider Component (memoized)
const Slider = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { img: require('../styles/slide1.jpg'), title: 'Slide 1' },
    { img: require('../styles/slide2.jpg'), title: 'Slide 2' },
    { img: require('../styles/slide3.jpg'), title: 'Slide 3' }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(slideInterval); // Clean up on unmount
  }, [slides.length]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
          <img src={slide.img} alt={slide.title} loading="lazy" />
          <h2>{slide.title}</h2>
        </div>
      ))}
    </div>
  );
});

function Home() {
  useEffect(() => {
    setTimeout(() => {
      AOS.init({ duration: 1000, once: true });
    }, 500); // Delay for AOS initialization
  }, []);

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-links">
          <li><Link to="/home" aria-label="Home">Home</Link></li>
          <li><Link to="/signup" aria-label="Sign Up">Sign Up</Link></li>
          <li><Link to="/login" aria-label="Log In">Log In</Link></li>
          <li><Link to="/creators" aria-label="Creators">Creators</Link></li>
          <li><Link to="/about" aria-label="About">About Us</Link></li>
          <li><Link to="/contact" aria-label="Contact">Contact Us</Link></li>
        </ul>
      </nav>

      {/* Hero Section with Parallax Background */}
      <div className="hero-section">
        <div className="hero-content" data-aos="fade-in">
          <h1>Find Your Perfect Course</h1>
          <p>"Personalized course recommendations at your fingertips."</p>
          <button className="cta-button" data-aos="zoom-in">Explore Courses</button>
        </div>

        {/* Lottie animation with Suspense */}
        <div className="hero-lottie">
          <Suspense fallback={<div>Loading Animation...</div>}>
            <Lottie animationData={animationData} loop={false} autoplay /> {/* Disabled loop */}
          </Suspense>
        </div>
      </div>

      {/* Slider Component */}
      <Slider />

      {/* Course Recommendations Section */}
      <div className="course-recommendations">
        <h2 data-aos="slide-in">Top Recommended Courses</h2>
        <div className="course-grid">
          <div className="course-card" data-aos="zoom-in">
            <img 
              src={require("../styles/zhenyu-luo-kE0JmtbvXxM-unsplash.jpg")} 
              alt="Course 1" 
              loading="lazy"
            />
            <h3>Course 1</h3>
            <p>Learn the fundamentals of programming.</p>
            <button>Enroll Now</button>
          </div>
          <div className="course-card" data-aos="zoom-in" data-aos-delay="200">
            <img 
              src={require("../styles/diggity-marketing-SB0WARG16HI-unsplash.jpg")} 
              alt="Course 2"
              loading="lazy"
            />
            <h3>Course 2</h3>
            <p>Master data science and AI techniques.</p>
            <button>Enroll Now</button>
          </div>
        </div>
      </div>

      {/* Parallax Scrolling Section */}
      <div className="parallax-section">
        <div className="parallax-content">
          <h2>Learn, Grow, Succeed</h2>
          <p>Our platform helps you reach your goals.</p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="call-to-action" data-aos="fade-up">
        <h2>Join Our Learning Community</h2>
        <p>Sign up to access personalized courses and start learning today.</p>
        <Link to="/signup" className="cta-button">Get Started</Link>
      </div>
    </div>
  );
}

export default Home;
