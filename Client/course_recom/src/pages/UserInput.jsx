import React, { useState } from 'react';
import axios from 'axios';

const UserInput = () => {
  const [userId, setUserId] = useState('');
  const [interests, setInterests] = useState('');
  const [pastExperience, setPastExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [error, setError] = useState(''); // To capture and display errors
  const [success, setSuccess] = useState(''); // To show success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success

    try {
      // Save user input
      await axios.post('http://localhost:3000/UserInput', { 
        userId: Number(user_id), // Ensure it's a number
        interests,
        pastExperience,
        skills,
      });

      // Fetch the recommendations for the user after saving input
      const response = await axios.get(`http://localhost:3000/getRecommendations/${user_id}`);
      setRecommendedCourses(response.data);  // Store the recommendations in state

      // Show success message and clear form
      setSuccess('User input saved and recommendations fetched successfully!');
      setUserId('');
      setInterests('');
      setPastExperience('');
      setSkills('');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to fetch recommendations. Please try again.');
    }
  };

  return (
    <div>
      <h1>Course Recommender Input Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="User-id">
            <label>
              User ID:
              <input 
                type="number" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                required // Ensure the field is filled
              />
            </label>
          </div> 
          <br />
          <div className="Interest">
            <label>
              Interests:
              <input 
                type="text" 
                value={interests} 
                onChange={(e) => setInterests(e.target.value)} 
                required 
              />
            </label>
          </div>
          <br />
          <div className="past-experience">
            <label>
              Past Experience:
              <input 
                type="text" 
                value={pastExperience} 
                onChange={(e) => setPastExperience(e.target.value)} 
              />
            </label>
          </div>
          <br />
          <div className="Skills">
            <label>
              Skills:
              <input 
                type="text" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)} 
              />
            </label>
          </div>
          <br />
          <div className="Submit">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>} 
      {success && <p style={{ color: 'green' }}>{success}</p>} 

      {recommendedCourses.length > 0 && (
        <div>
          <h2>Recommended Courses:</h2>
          <ul>
            {recommendedCourses.map((course, index) => (
              <li key={index}>
                {course.description} (Course ID: {course.courseId}) - 
                <a href={course.link} target="_blank" rel="noopener noreferrer">View Course</a>
              </li>      
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInput;
