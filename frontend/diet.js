const dietaryRecommendations = {
    underweight: {
        BMI: "Below 18.5",
        recommendations: [
            "Focus on increasing calorie intake to reach a healthy weight.",
            "Include nutrient-dense foods such as lean proteins, healthy fats, whole grains, fruits, and vegetables.",
            "Incorporate calorie-dense snacks like nuts, dried fruits, avocados, and nut butters.",
            "Consider small, frequent meals to increase overall calorie intake."
        ]
    },
    normalWeight: {
        BMI: "18.5 - 24.9",
        recommendations: [
            "Maintain a balanced diet with a variety of foods from all food groups.",
            "Focus on portion control to maintain a healthy weight.",
            "Emphasize whole, minimally processed foods such as fruits, vegetables, whole grains, lean proteins, and healthy fats.",
            "Limit intake of added sugars, saturated fats, and refined carbohydrates."
        ]
    },
    overweight: {
        BMI: "25 - 29.9",
        recommendations: [
            "Aim to reduce calorie intake while still obtaining essential nutrients.",
            "Incorporate more fruits, vegetables, and whole grains to increase fiber intake and promote satiety.",
            "Choose lean protein sources such as poultry, fish, beans, and legumes.",
            "Limit portion sizes and reduce intake of high-calorie, low-nutrient foods such as sugary snacks, fried foods, and processed snacks.",
            "Engage in regular physical activity to support weight loss efforts."
        ]
    },
    obese: {
        BMI: "30 or Above",
        recommendations: [
            "Focus on gradual weight loss through a combination of diet and exercise.",
            "Adopt a well-balanced, calorie-controlled diet that emphasizes whole foods and limits processed foods, sugary beverages, and high-calorie snacks.",
            "Include lean proteins, high-fiber foods, and healthy fats to promote satiety and maintain muscle mass.",
            "Consider working with a registered dietitian or nutritionist to develop a personalized meal plan.",
            "Incorporate regular physical activity, such as aerobic exercise and strength training, to support weight loss and improve overall health."
        ]
    }
};

export default dietaryRecommendations;
