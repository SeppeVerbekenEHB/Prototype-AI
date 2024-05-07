//Globals
let video, canvas, context, detector;
let detectedObjects = [];
let detecting = false;

//const ModelURL = 'cocossd';
const ModelURL = 'yolo';

let hasRecentlyFetched = false
let lastDetectedObject = null;

async function init() {
    //load camera on hided video element
    video = await loadWebcamStream();

    //load detection model
    const options = {
        modelUrl: ModelURL
    };
    detector = ml5.objectDetector('cocossd', modelLoaded);

    //add detection start/stop button handlers
    // document.getElementById('detectStart').addEventListener('click', startDetection);
    // document.getElementById('detectStop').addEventListener('click', stopDetection);

    // Add fetch nutritional facts button handler
    document.getElementById('fetchButton').addEventListener('click', fetchNutritionalFacts);
}

function registerData() {
    if (detectedObjects.length) {
        detectedObjects.forEach(obj => {
            const {
                x,
                y,
                width,
                height
            } = obj;
            const confidence = obj.confidence;
            const label = obj.label;

            // Check if the detected label is a fruit or vegetable
            const fruitVegetableClasses = ['apple', 'banana', 'broccoli', 'carrot', 'orange'];
            if (fruitVegetableClasses.includes(label) && confidence > 0.8) {
                //console.log(`Detected ${label} with confidence ${confidence}`);
                lastDetectedObject = label;
            }
        });
    }
    requestAnimationFrame(registerData);
}

async function fetchNutritionalFacts(object) {
    try {
        if (!lastDetectedObject) {
            console.error('No object detected yet');
            return;
        }
        const response = await fetch(`http://localhost:3001/api/nutrition/${lastDetectedObject}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Print the nutritional facts

        // Construct URL with parameters
        const queryString = new URLSearchParams(data).toString();
        const url = `nutritionInfo.html?${queryString}`;

        // Navigate to the nutritional information page
        window.location.href = url;
    } catch (error) {
        console.error('Error fetching nutritional facts:', error);
    }
}

async function detect() {
    if (detecting) {
        // Run detection
        detectedObjects = await detector.detect(video);

        // Check data and update variables
        registerData();

        // Continue detection if still detecting
        if (detecting) {
            requestAnimationFrame(detect);
        }
    }
}

function modelLoaded() {
    // Update loader in HTML
    const loader = document.getElementById('loader');
    loader.classList.add('loaded');
    loader.innerText = 'Model loaded';
    detecting = true;
    detect();

    // Hide loader text after 5 seconds
    setTimeout(() => {
        loader.style.display = 'none';
    }, 5000);
}

function checkForDevices() {
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            console.log(devices);
        })
}

async function loadWebcamStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    facingMode: 'user'
                }
            })
            .then(stream => {
                console.log("Stream available");
                const video = document.querySelector('#webcam');
                video.srcObject = stream;
                video.play();
                return video;
            })
            .catch(error => {
                console.error("Error accessing webcam:", error);
            });
    }
}

//checkForDevices();
init();