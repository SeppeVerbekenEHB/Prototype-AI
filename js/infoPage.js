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
    document.getElementById('name').innerHTML = "<strong>Nutritional Information for</strong> " + name;
    document.getElementById('calories').innerHTML = "<strong>Calories:</strong> " + calories;
    document.getElementById('protein').innerHTML = "<strong>Protein:</strong> " + protein + "g";
    document.getElementById('carbohydrates').innerHTML = "<strong>Carbohydrates:</strong> " + carbs + "g";
    document.getElementById('fat').innerHTML = "<strong>Fat:</strong> " + fat + "g";
    document.getElementById('fiber').innerHTML = "<strong>Fiber:</strong> " + fiber + "g";
});

// Add event listener to the go back button
document.getElementById('goBackButton').addEventListener('click', function () {
    window.location.href = 'index.html'; // Replace 'index.html' with the scanning page URL
});