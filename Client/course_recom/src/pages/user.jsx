import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './User.css'; // Import the CSS file

const User = () => {
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [userName, setUserName] = useState('');

    // Fetch the user's name from MongoDB
    useEffect(() => {
        const fetchUserName = async () => {
            const response = await fetch('/api/user'); // Replace with your actual endpoint
            const data = await response.json();
            setUserName(data.name); // Adjust based on your response structure
        };

        fetchUserName();
    }, []);

    const toggleDashboard = () => {
        setIsDashboardOpen(!isDashboardOpen);
    };

    return (
        <div className="user-container">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Nexcent</span>
                    <nav className="flex space-x-4">
                        <Link to="/UserInput" className="button" data-info="Connect with courses tailored for you!">Course Connector</Link>
                        <Link to="/domain" className="button" data-info="Find domains related to your interests!">Domain Finder</Link>
                        <button className="button" onClick={toggleDashboard}>Toggle Dashboard</button>
                    </nav>
                </div>
            </header>

            {isDashboardOpen && (
                <div className="dashboard">
                    <div className="dashboard-content">
                        <h2 className="text-xl font-bold">User Profile</h2>
                        <p className="text-gray-600">Name: {userName}</p>
                        <Link to="/" className="button logout">Logout</Link>
                    </div>
                </div>
            )}

            <main>
                <section className="bg-gray-100 py-20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Welcome to the User Dashboard</h1>
                        <p className="text-gray-600 mt-4">Select an option above to get started.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default User;
