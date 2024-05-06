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
        fiber: 2.4
    },
    banana: {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        fat: 0.3,
        carbohydrates: 23,
        fiber: 2.6
    },
    broccoli: {
        name: "Broccoli",
        calories: 34,
        protein: 2.8,
        fat: 0.4,
        carbohydrates: 6,
        fiber: 2.4
    },
    carrot: {
        name: "Carrot",
        calories: 41,
        protein: 0.9,
        fat: 0.2,
        carbohydrates: 10,
        fiber: 2.8
    },
    orange: {
        name: "Orange",
        calories: 62,
        protein: 1.2,
        fat: 0.2,
        carbohydrates: 15,
        fiber: 3.1
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