// Import necessary React functionality
import React, { useState } from 'react';
// Import the DietPlan component
import DietPlans from './DietPlans';
// Import the associated CSS file for styling
import './bmicalculator.css';

// Define the BMICalculator component
const BMICalculator = () => {
  // State variables to hold user input and calculated values
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [bmi, setBmi] = useState('');
  const [neededCalories, setNeededCalories] = useState('');
  const [error, setError] = useState('');
  const [dietPlanVisible, setDietPlanVisible] = useState(false); // New state for DietPlan visibility

  // Function to convert height from feet and inches to centimeters
  const convertHeightToCm = () => {
    const heightInInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
    // 1 inch = 2.54 cm
    return heightInInches * 2.54;
  };

  // Function to determine health status based on BMI and return color
  const determineHealthStatus = (bmiValue) => {
    if (bmiValue < 18.5) {
      return {
        status: 'Underweight',
        color: 'purple',
        description: 'You are underweight. Consider consulting with a healthcare professional for guidance on reaching a healthy weight.',
      };
    } else if (bmiValue >= 18.5 && bmiValue <= 22.9) {
      return {
        status: 'Healthy',
        color: 'green',
        description: 'Congratulations! You are in a healthy weight range. Keep up the good work with a balanced diet and regular exercise.',
      };
    } else if (bmiValue > 22.9 && bmiValue <= 27.4) {
      return {
        status: 'Overweight',
        color: 'orange',
        description: 'You are above the healthy weight range. Consider making lifestyle changes, including a balanced diet and increased physical activity, for better health.',
      };
    } else {
      return {
        status: 'Obese',
        color: 'red',
        description: 'You are in the obese category. It is crucial to address this for your overall health. Consult with a healthcare professional for guidance on weight management strategies.',
      };
    }
  };

  // Function to calculate BMI and needed calories
  const calculateBMI = () => {
    // Check if input values are valid
    if (heightFeet > 0 && heightInches >= 0 && weight > 0 && age > 0) {
      // Convert height to centimeters
      const heightCm = convertHeightToCm();

      // Calculate BMI
      const bmiValue = weight / (heightCm * heightCm / 10000);
      setBmi(bmiValue.toFixed(2));

      // Calculate BMR based on Harris-Benedict Equation
      const bmr = gender === 'male'
        ? 88.362 + (13.397 * weight) + (4.799 * heightCm) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * heightCm) - (4.330 * age);

      // Calculate TDEE based on activity level
      const activityMultipliers = {
        sedentary: 1.2,
        lightlyActive: 1.375,
        moderatelyActive: 1.55,
        veryActive: 1.725,
        extremelyActive: 1.9,
      };

      const tdee = bmr * activityMultipliers[activityLevel];

      // Set the calculated TDEE as needed calories
      setNeededCalories(tdee.toFixed(2));

      // Clear any previous error
      setError('');

      // Render the DietPlan component with the calculated BMI
      setDietPlanVisible(true);
    } else {
      // Set an error message if input values are not valid
      setError('Please enter valid values for height, weight, and age.');
      // Hide the DietPlan component if there's an error
      setDietPlanVisible(false);
    }
  };

  // JSX structure for the component
  return (
    <div className={`bmi-calculator-container ${determineHealthStatus(parseFloat(bmi)).color}`}>
      {/* Content container */}
      <div className="content">
        {/* Heading */}
        <h2>BMI Calculator</h2>

        {/* Form for user input */}
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Height (feet):
            <input
              type="number"
              value={heightFeet}
              onChange={(e) => setHeightFeet(e.target.value)}
              placeholder="Enter feet"
              aria-label="Height in feet"
              required
            />
          </label>

          <label>
            Height (inches):
            <input
              type="number"
              value={heightInches}
              onChange={(e) => setHeightInches(e.target.value)}
              placeholder="Enter inches"
              aria-label="Height in inches"
              required
            />
          </label>

          <label>
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              aria-label="Weight in kilograms"
              required
            />
          </label>

          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              aria-label="Age"
              required
            />
          </label>

          <label>
            Gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              aria-label="Select gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>

          <label>
            Activity Level:
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              aria-label="Select activity level"
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightlyActive">Lightly Active</option>
              <option value="moderatelyActive">Moderately Active</option>
              <option value="veryActive">Very Active</option>
              <option value="extremelyActive">Extremely Active</option>
            </select>
          </label>

          {/* Container for the "Calculate" button, centered */}
          <div className="button-container">
            {/* Button to trigger BMI calculation */}
            <button className="cal-button" onClick={calculateBMI}>Calculate</button>
          </div>
        </form>

        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        {/* Additional information based on BMI result */}
        {!error && bmi && (
  <div className="additional-info">
    <h3>Your BMI is: {bmi}</h3>
    <p className="status-message" style={{ color: determineHealthStatus(parseFloat(bmi)).color }}>
      {determineHealthStatus(parseFloat(bmi)).status}
    </p>
    <p>{determineHealthStatus(parseFloat(bmi)).description}</p>
    <p>Estimated Needed Calories: {neededCalories} kcal</p>
  </div>
)}



        {/* Display DietPlan component if visible */}
        {dietPlanVisible && <DietPlans bmi={bmi} />}
      </div>
    </div>
  );
};

// Export the BMICalculator component
export default BMICalculator;