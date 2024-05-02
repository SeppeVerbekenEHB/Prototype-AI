const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Function to retrieve nutritional information for a class
function getNutritionalInfoForClass(className) {
    // Placeholder function, replace with actual data retrieval logic
    // Return nutritional information for the specified class
    return {
        className,
        nutritionalInfo: {
            calories: 100, // Example calories value
            protein: 2, // Example protein value
            fat: 1, // Example fat value
            // Add more nutritional information fields as needed
        }
    };
}

// Define API endpoint to retrieve nutritional information for a class
app.get('/api/nutrition/:class', (req, res) => {
    const fruitVegetableClasses = ['apple', 'banana', 'broccoli', 'carrot', 'orange'];
    const requestedClass = req.params.class.toLowerCase();

    if (fruitVegetableClasses.includes(requestedClass)) {
        // Retrieve nutritional information for the requested class
        const info = getNutritionalInfoForClass(requestedClass);
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