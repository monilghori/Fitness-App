import React, { useState } from 'react';
import './Workout.css';
import workoutData from '../../../workout';

const Workout = () => {
  const [bmi, setBmi] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleGetWorkout = () => {
    const bmiValue = parseFloat(bmi);
    if (isNaN(bmiValue)) {
      alert('Please enter a valid BMI.');
      return;
    }

    let selectedWorkoutPlan = null;
    // workoutData.forEach(data => {
    //   const bmiRange = data.category.match(/\d+(?:\.\d+)?/g);
    //   if (bmiValue >= bmiRange[0] && bmiValue <= bmiRange[1]) {
    //     selectedWorkoutPlan = data;
    //   }
    // });
    if(bmiValue < 18.5){
        selectedWorkoutPlan=workoutData[0];
    }else if(bmiValue>=18.5 && bmiValue<=24.9){
        selectedWorkoutPlan=workoutData[1];
    } else if(bmiValue>=25 && bmiValue<=29.9){
        selectedWorkoutPlan=workoutData[2];
    }else{
        selectedWorkoutPlan=workoutData[3];
    }

    if (selectedWorkoutPlan) {
      setWorkoutPlan(selectedWorkoutPlan);
    } else {
      alert('No workout plan available for the entered BMI.');
    }
  };

  return (
    <div className="workout-container">
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter your BMI"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleGetWorkout}>Get Workout</button>
      </div>
      {workoutPlan && (
        <div className="workout-result">
          <h2>{workoutPlan.category}</h2>
          <p><strong>Goal:</strong> {workoutPlan.goal}</p>
          <h3>Workout Plan:</h3>
          <ul>
            {workoutPlan.workoutPlan.map((item, index) => (
              <li key={index}>
                {item.includes("*") ? <span className="highlight">{item}</span> : item}
              </li>
            ))}
          </ul>
          <p><strong>Nutrition Tip:</strong> {workoutPlan.nutritionTip}</p>
        </div>
      )}
    </div>
  );
};

export default Workout;
