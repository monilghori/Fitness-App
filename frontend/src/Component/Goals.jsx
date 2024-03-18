import React, { useState } from 'react';
import './goals.css'; // Import the CSS file

const Goals = () => {
  const [bmi, setBMI] = useState(null);
  const [healthGoals, setHealthGoals] = useState([]);
  const [bmiInput, setBMIInput] = useState('');
  const [completedGoals, setCompletedGoals] = useState(Array(5).fill(false)); // Array to track completed goals

  const calculateHealthGoals = () => {
    const parsedBMI = parseFloat(bmiInput);
    if (!isNaN(parsedBMI)) {
      setBMI(parsedBMI);
      setHealthGoals(getGoalsForCategory(parsedBMI));
      setCompletedGoals(Array(5).fill(false)); // Reset completed goals on calculation
    } else {
      console.error('Invalid BMI input');
    }
  };

  const getGoalsForCategory = (inputBMI) => {
    // Health goals suggestions based on BMI categories
    if (inputBMI < 18.5) {
      return [
        'Increase calorie intake with nutrient-dense foods.',
        'Include strength training exercises to build muscle mass.',
        'Ensure adequate protein intake for muscle repair and growth.',
        'Stay hydrated by drinking enough water throughout the day.',
        'Incorporate healthy fats like avocados and nuts into your diet.',
      ];
    } else if (inputBMI >= 18.5 && inputBMI <= 24.9) {
      return [
        'Maintain a balanced diet with a variety of nutrients.',
        'Engage in regular aerobic exercises for cardiovascular health.',
        'Incorporate flexibility and stretching exercises for joint health.',
        'Get sufficient quality sleep for overall well-being.',
        'Manage stress through relaxation techniques or hobbies.',
      ];
    } else if (inputBMI >= 25 && inputBMI <= 29.9) {
      return [
        'Focus on portion control and choose whole, unprocessed foods.',
        'Incorporate regular physical activity to support weight management.',
        'Explore stress-reducing activities such as meditation or yoga.',
        'Monitor and manage cholesterol levels through a heart-healthy diet.',
        'Aim for at least 30 minutes of moderate exercise most days of the week.',
      ];
    } else {
      return [
        'Prioritize a well-balanced diet with emphasis on whole foods.',
        'Include both aerobic and strength training exercises for overall health.',
        'Monitor blood pressure and cholesterol levels regularly.',
        'Incorporate omega-3 fatty acids for heart health (e.g., fatty fish).',
        'Stay socially connected to support mental and emotional well-being.',
      ];
    }
  };

  const handleGoalCompletion = (index) => {
    const updatedCompletedGoals = [...completedGoals];
    updatedCompletedGoals[index] = !completedGoals[index];
    setCompletedGoals(updatedCompletedGoals);
  };

  return (
    <div className="goals-container">
      <h2 className="goals-heading">Health Goals</h2>
      <form onSubmit={(e) => e.preventDefault()} className="input-form">
        <h3 className="input-label">Enter Your BMI</h3>
        <input
          type="number"
          placeholder="Enter your BMI"
          value={bmiInput}
          onChange={(e) => setBMIInput(e.target.value)}
          className="input-field"
        />
        <button onClick={calculateHealthGoals} className="calculate-button">
          Calculate
        </button>
      </form>

      {bmi && (
        <div className="result-container">
          <p className="bmi-text">Your BMI: {bmi}</p>
          <div className="goals-cards">
            {healthGoals.map((goal, index) => (
              <div key={index} className={`goal-card ${completedGoals[index] ? 'completed' : ''}`}>
                <div className="goal-content">
                  <p className="goal-number">Goal {index + 1}</p>
                  <p className="goal-description">{goal}</p>
                </div>
                <input
                  type="checkbox"
                  checked={completedGoals[index]}
                  onChange={() => handleGoalCompletion(index)}
                  className="goal-checkbox"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;