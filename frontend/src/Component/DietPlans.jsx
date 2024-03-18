import React, { useState } from 'react';
import './dietplans.css';
import dietData from '../../diet'; 

const DietPlans = () => {
  const [bmi, setBmi] = useState('');
  const [diet, setDiet] = useState(null);

  const handleGetDiet = () => {
    const bmiValue = parseFloat(bmi);
    if (isNaN(bmiValue)) {
      alert('Please enter a valid BMI.');
      return;
    }

    let selectedDiet = null;
    if (bmiValue < 18.5) {
      selectedDiet = dietData.underweight;
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      selectedDiet = dietData.normalWeight;
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      selectedDiet = dietData.overweight;
    } else {
      selectedDiet = dietData.obese;
    }

    if (selectedDiet) {
      setDiet(selectedDiet);
    } else {
      alert('No diet plan available for the entered BMI.');
    }
  };

  return (
    <div className="diet-container">
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter your BMI"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleGetDiet}>Get Diet Plans</button>
      </div>
      {diet && (
        <div className="diet-result">
          {/* <h2>{diet.BMI}</h2> */}
          <h3>Recommendations:</h3>
          <ul>
            {diet.recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DietPlans;
