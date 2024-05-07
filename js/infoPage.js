document.addEventListener('DOMContentLoaded', function () {
    // Parse the query string to get the parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get the parameter values
    const name = urlParams.get('name');
    const calories = urlParams.get('calories');
    const protein = urlParams.get('protein');
    const carbs = urlParams.get('carbohydrates');
    const fat = urlParams.get('fat');
    const fiber = urlParams.get('fiber');

    // Display the retrieved data on the page
    document.getElementById('name').innerHTML = "<strong>" + name + "</strong";
    document.getElementById('calories').innerHTML = "<strong>Calories:</strong> " + calories;
    document.getElementById('protein').innerHTML = "<strong>Protein:</strong> " + protein + "g";
    document.getElementById('carbohydrates').innerHTML = "<strong>Carbohydrates:</strong> " + carbs + "g";
    document.getElementById('fat').innerHTML = "<strong>Fat:</strong> " + fat + "g";
    document.getElementById('fiber').innerHTML = "<strong>Fiber:</strong> " + fiber + "g";

    const image = document.getElementById('image');
    // Set the src attribute based on the detected fruit/vegetable
    switch (name.toLowerCase()) {
        case 'apple':
            image.src = '../images/apple.jpg';
            break;
        case 'banana':
            image.src = '../images/banana.jpg';
            break;
        case 'broccoli':
            image.src = '../images/broccoli.jpg';
            break;
        case 'carrot':
            image.src = '../images/carrot.jpg';
            break;
        case 'orange':
            image.src = '../images/orange.jpg';
            break;
        default:
            image.src = '../images/default.jpg';
    }
});

// Add event listener to the go back button
document.getElementById('goBackButton').addEventListener('click', function () {
    window.location.href = 'index.html'; // Replace 'index.html' with the scanning page URL
});