const express = require('express');
const router = express.Router();
const DietPlan = require('../models/DietPlanModel'); // Import the DietPlanModel model
const showingDietPlan = require('../models/showingDietPlan'); // Import the DietPlan model

// Route handler for saving diet plan data
router.post('/save-diet-plan', async (req, res) => {
  try {
    // Extract the diet plan data from the request body
    const { bmi, planTitle, breakfastItems, midMorningSnackItems, lunchItems, afternoonSnackItems, dinnerItems, eveningSnackItems } = req.body;

    // Create a new instance of the DietPlan model with the extracted data
    const newDietPlan = new DietPlan({
      bmi,
      planTitle,
      breakfastItems,
      midMorningSnackItems,
      lunchItems,
      afternoonSnackItems,
      dinnerItems,
      eveningSnackItems
    });

    // Save the new diet plan data to the database
    const savedDietPlan = await newDietPlan.save();

    // Respond with the saved diet plan data
    res.status(201).json(savedDietPlan);
  } catch (error) {
    // Handle errors
    console.error('Error saving diet plan data:', error);
    res.status(500).json({ error: 'Failed to save diet plan data' });
  }
});

// Route handler for fetching diet plan based on BMI
router.get('/diet-plan/:bmi', async (req, res) => {
  try {
    const bmi = req.params.bmi;
    // Find the diet plan based on BMI range
    const dietPlan = await showingDietPlan.findOne({
      $and: [
        { 'bmiRange.min': { $lte: bmi } },
        { 'bmiRange.max': { $gte: bmi } }
      ]
    });
    if (!dietPlan) {
      return res.status(404).json({ error: 'Diet plan not found for the specified BMI' });
    }
    res.json(dietPlan);
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    res.status(500).json({ error: 'Failed to fetch diet plan' });
  }
});

module.exports = router;
