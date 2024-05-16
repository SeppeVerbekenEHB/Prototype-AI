const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const fruitData = {
    apple: {
        name: "Apple",
        calories: 52,
        protein: 0.3,
        fat: 0.2,
        carbohydrates: 14,
        fiber: 2.4,
        environmentalInfo: "Apples are commonly grown in orchards, which often require the use of pesticides and fungicides to prevent pests and diseases. Additionally, transporting apples from orchards to markets can contribute to carbon emissions, especially if they are transported over long distances."
    },
    banana: {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        fat: 0.3,
        carbohydrates: 23,
        fiber: 2.6,
        environmentalInfo: "Bananas are typically grown in tropical regions and are often transported long distances to reach consumers in other parts of the world. This transportation contributes to carbon emissions. Additionally, banana plantations sometimes involve the use of pesticides and fertilizers, which can have negative environmental impacts."
    },
    broccoli: {
        name: "Broccoli",
        calories: 34,
        protein: 2.8,
        fat: 0.4,
        carbohydrates: 6,
        fiber: 2.4,
        environmentalInfo: "Broccoli requires a relatively large amount of water to grow compared to some other vegetables. Additionally, conventional broccoli farming may involve the use of pesticides and fertilizers, which can have environmental consequences."
    },
    carrot: {
        name: "Carrot",
        calories: 41,
        protein: 0.9,
        fat: 0.2,
        carbohydrates: 10,
        fiber: 2.8,
        environmentalInfo: "Carrots are generally considered to be a relatively environmentally friendly crop to grow, as they require less water and fertilizer compared to some other vegetables. However, they may still be treated with pesticides and transported over long distances, which can contribute to environmental impact."
    },
    orange: {
        name: "Orange",
        calories: 62,
        protein: 1.2,
        fat: 0.2,
        carbohydrates: 15,
        fiber: 3.1,
        environmentalInfo: "Oranges are often grown in regions with a warm climate and may require irrigation in areas where water is scarce. Additionally, oranges are commonly transported long distances to reach consumers, which can contribute to carbon emissions."
    }
};

app.get('/api/nutrition/:class', (req, res) => {
    const fruitVegetableClasses = ['apple', 'banana', 'broccoli', 'carrot', 'orange'];
    const requestedClass = req.params.class.toLowerCase();

    if (fruitVegetableClasses.includes(requestedClass)) {
        // Retrieve nutritional information for the requested class
        const info = fruitData[requestedClass];
        res.json(info);
    } else {
        res.status(404).json({
            error: 'Class not found'
        });
    }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;