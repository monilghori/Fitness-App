// populateDietPlans.js

const mongoose = require('mongoose');
const DietPlan = require('./models/showingDietPlan');
require("./database");
// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/BrunelFitnessMongoDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Define diet plans for different BMI ranges
    const dietPlans = [
      {
        bmiRange: { min: 0, max: 18.4 },
        planTitle: 'Underweight Diet Plan',
        breakfastItems: [
          'Protein-Packed Smoothie: Banana, spinach, protein powder, almond milk.',
          'Whole-Grain Breakfast Bowl: Whole-grain cereal, mixed berries, sliced almonds, and low-fat milk.',
        ],
        midMorningSnackItems: [
          'Energy-Boosting Snack: Apple slices with a tablespoon of almond butter.',
          'Protein-Rich Option: Cottage cheese with pineapple chunks.',
        ],
        lunchItems: [
          'Veggie Wrap: Whole-grain wrap with hummus, assorted veggies, and grilled chicken or tofu.',
          'Quinoa Power Bowl: Quinoa, black beans, cherry tomatoes, avocado, and a light dressing.',
        ],
        afternoonSnackItems: [
          'Greek Yogurt Delight: Greek yogurt with granola, mixed berries, and a drizzle of honey.',
          'Trail Mix Mix-Up: Trail mix with a variety of nuts, seeds, and dried fruits.',
        ],
        dinnerItems: [
          'Colorful Stir-Fry: Stir-fried tofu or shrimp with a variety of colorful vegetables and brown rice.',
          'Lean Protein Combo: Grilled chicken with sweet potato wedges and steamed broccoli.',
        ],
        eveningSnackItems: ['Fruit Medley: Mixed fruit salad with mint.'],
      },
      {
        bmiRange: { min: 18.5, max: 24.9 },
        planTitle: 'Normal Weight Diet Plan',
        breakfastItems: [
          'Whole-Grain Bliss: Whole-grain pancakes with fresh berries and a dollop of yogurt.',
          'Eggs Benedict Twist: English muffin, poached eggs, smoked salmon, and hollandaise sauce.',
        ],
        midMorningSnackItems: [
          'Nutty Boost: Handful of mixed nuts (almonds, walnuts, pistachios) with dried cranberries.',
          'Fruit Fusion: Orange slices with a handful of grapes.',
        ],
        lunchItems: [
          'Mediterranean Delight: Greek salad with feta cheese, olives, cherry tomatoes, and grilled chicken.',
          'Veggie Power Plate: Quinoa and kale salad with roasted chickpeas, cherry tomatoes, and a tahini dressing.',
        ],
        afternoonSnackItems: [
          'Cheese and Fruit Pairing: Low-fat cheese with apple slices.',
          'Protein Punch: Cottage cheese with pineapple chunks and a sprinkle of cinnamon.',
        ],
        dinnerItems: [
          'Fish Taco Fiesta: Grilled fish tacos with slaw, avocado, and whole-grain tortillas.',
          'Asian-Inspired Bowl: Teriyaki tofu with brown rice and stir-fried vegetables.',
        ],
        eveningSnackItems: [
          'Chocolate & Nuts: Dark chocolate squares with a few almonds.',
          'Yogurt Parfait: Non-fat Greek yogurt with granola and mixed berries.',
        ],
      },
      {
        bmiRange: { min: 25, max: 29.9 },
        planTitle: 'Overweight Diet Plan',
        breakfastItems: [
          'Oatmeal Extravaganza: Oatmeal with sliced banana, chia seeds, and a dollop of almond butter.',
          'Berry Blast Smoothie: Mixed berry smoothie with spinach, protein powder, and almond milk.',
        ],
        midMorningSnackItems: [
          'Veggies and Dip: Baby carrots with hummus.',
          'Fruity Pick-Me-Up: Apple slices with a tablespoon of peanut butter.',
        ],
        lunchItems: [
          'Lean Burger Combo: Turkey burger on a whole-grain bun with lettuce, tomato, and a side of sweet potato fries.',
          'Vegetarian Grain Bowl: Quinoa bowl with roasted vegetables, black beans, and avocado.',
        ],
        afternoonSnackItems: [
          'Yogurt and Grapes: Non-fat Greek yogurt with a handful of grapes.',
          'Healthy Crackers: Whole-grain crackers with hummus.',
        ],
        dinnerItems: [
          'Chicken and Veggie Kabobs: Grilled chicken and vegetable skewers with quinoa.',
          'Spaghetti Squash Pasta: Spaghetti squash with marinara sauce and lean ground turkey.',
        ],
        eveningSnackItems: [
          'Air-Popped Popcorn: Popcorn seasoned with nutritional yeast and a dash of paprika.',
          'Frozen Yogurt Delight: Small serving of frozen yogurt with fresh berries.',
        ],
      },
      {
        bmiRange: { min: 30, max: 1000 }, // Adjust max BMI range accordingly
        planTitle: 'Obese Diet Plan',
        breakfastItems: [
          'Veggie Scramble: Vegetable and egg white scramble with whole-grain toast.',
          'Fruit Smoothie Bowl: Smoothie bowl with mixed fruits, granola, and a sprinkle of coconut flakes.',
        ],
        midMorningSnackItems: [
          'Cheese and Tomato: Cherry tomatoes with mozzarella cheese bites.',
          'Grape Bunch: Small bunch of grapes.',
        ],
        lunchItems: [
          'Grilled Chicken Salad: Grilled chicken Caesar salad with a light dressing.',
          'Veggie Wrap: Whole-grain wrap with hummus, assorted veggies, and lean turkey slices.',
        ],
        afternoonSnackItems: [
          'Healthy Cheese Snack: Low-fat string cheese with a small bunch of grapes.',
          'Greek Yogurt Parfait: Greek yogurt parfait with granola and mixed berries.',
        ],
        dinnerItems: [
          'Lean Protein Plate: Baked tilapia with quinoa pilaf and roasted Brussels sprouts.',
          'Veggie Stir-Fry: Tofu and vegetable stir-fry with brown rice.',
        ],
        eveningSnackItems: [
          'Sweet and Salty Mix: Handful of pretzels and a few dark chocolate-covered almonds.',
          'Berry Sorbet: Small serving of berry sorbet.',
        ],
      },
    ];

    // Insert diet plans into the database
    await DietPlan.insertMany(dietPlans);
    console.log('Diet plans inserted successfully');
    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting diet plans:', error);
    // Close the database connection
    mongoose.connection.close();
  }
});
