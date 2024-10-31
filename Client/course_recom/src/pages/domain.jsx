import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import Animation from '../assets/Animation - 1728213538584.json';

const DomainInput = () => {
  const [userId, setUserId] = useState('');
  const [interests, setInterests] = useState('');
  const [pastExperience, setPastExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [recommendedDomains, setRecommendedDomains] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saveResponse = await axios.post('http://localhost:3000/domain', {
        userId,
        interests,
        pastExperience,
        skills,
      });

      if (saveResponse.status === 200) {
        console.log('Domain input saved successfully.');

        const response = await axios.get(`http://localhost:3000/getdomains/${userId}`);

        if (response.status === 200) {
          setRecommendedDomains(response.data);
          console.log('Recommended domains fetched successfully.');
        } else {
          console.error('Failed to fetch recommended domains.');
        }
      } else {
        console.error('Failed to save domain input.');
      }
    } catch (error) {
      console.error('Error occurred during domain input or fetching recommendations:', error);
    }
  };

  return (
    <div>
      <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <Lottie animationData={Animation} loop={true} style={{ width: '100%', height: '100%' }} />
      </div>
      <h1>Domain Recommender Input Page</h1>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='User-id'>
            <label>
              User ID:
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </label>
          </div>
          <br />
          <div className='Interest'>
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
          <div className='past-experience'>
            <label>
              Past Experience:
              <input
                type="text"
                value={pastExperience}
                onChange={(e) => setPastExperience(e.target.value)}
                required
              />
            </label>
          </div>
          <br />
          <div className='Skills'>
            <label>
              Skills:
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />
            </label>
          </div>
          <br />
          <div className='Submit'>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      {recommendedDomains.length > 0 && (
        <div>
          <h2>Recommended Domains:</h2>
          <ul>
            {recommendedDomains.map((domain, index) => (
              <li key={index}>{domain}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DomainInput;
