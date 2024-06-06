import React, { useState } from 'react';
import './Recommendation.css';
import axios from 'axios';
import recommendedImage from '../assets/recommended.png'; // Adjust the import path

const Recommendation = () => {
  const [input, setInput] = useState('');
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleclick = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/recommend", {
        "rejection_cause": input
      });
      setRecommendedCourses(response.data.recommended_courses);
    } catch (error) {
      console.error("Error fetching recommended courses:", error);
      // Optionally handle the error here
    }
  };

  return (
    <div className="credit-form">
      <h3 style={{ textAlign: 'center', color: '#E6BE8A', padding: '10px', width: '100%'  }}>Improve your score </h3>

      <label htmlFor="cause of rejection">Cause of rejection:</label>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={handleclick} className="icon-button">⭐️</button>
        <input onChange={handleInputChange} type="text" id="credit" name="credit" placeholder="Cause of rejection" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
      </div>

      {/* Render recommended courses */}
      {recommendedCourses.length > 0 && (
        <div>
          <h4>Recommended Courses:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {recommendedCourses.map((course, index) => (
              <li key={course} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '10px' }}>{index + 1}.</span> {/* Number each course */}
                <span style={{ marginRight: '20px' }}>•</span>
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add photo */}
      <img src={recommendedImage} alt="Recommended" style={{ display: 'block', margin: '0 auto', marginTop: '20px', maxWidth: '50%' }} />
    </div>
  );
};

export default Recommendation;
