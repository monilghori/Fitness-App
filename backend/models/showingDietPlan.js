

const mongoose = require('mongoose');

// Define the schema for diet plan data
const dietPlanSchema = new mongoose.Schema({
  bmiRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  planTitle: { type: String, required: true },
  breakfastItems: [{ type: String, required: true }],
  midMorningSnackItems: [{ type: String, required: true }],
  lunchItems: [{ type: String, required: true }],
  afternoonSnackItems: [{ type: String, required: true }],
  dinnerItems: [{ type: String, required: true }],
  eveningSnackItems: [{ type: String, required: true }]
}, { collection: 'dietplans' }); // Specify collection name as 'dietplans'

// Create and export the model
module.exports = mongoose.model('showingDietPlans', dietPlanSchema);
