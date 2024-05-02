//Globals
let video, canvas, context, detector;
let detectedObjects = [];
let detecting = false;

const ModelURL = 'cocossd';
//const ModelURL = 'yolo';

async function init() {
    //load camera on hided video element
    video = await loadWebcamStream();
    //get canvas and context
    canvas = document.querySelector('#canvas');
    context = canvas.getContext('2d');

    //start drawing video on context
    draw();

    //load detection model
    const options = {
        modelUrl: ModelURL
    };
    detector = ml5.objectDetector('cocossd', modelLoaded);

    //add detection start/stop button handlers
    document.getElementById('detectStart').addEventListener('click', startDetection);
    document.getElementById('detectStop').addEventListener('click', stopDetection);
}

function draw() {
    // Clear part of the canvas
    context.drawImage(video, 0, 0);

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
            const color = 'red'; // You can adjust the color as needed

            drawBox(x, y, width, height, color, label, confidence);
        });
    }
    requestAnimationFrame(draw);
}

function drawBox(x, y, w, h, color, label, confidence) {
    context.fillStyle = color;
    context.font = "20px Arial";
    context.fillText(label, x, y);
    confidence = Math.round(confidence * 100) + '%';
    context.fillText(confidence, x, y + 20);

    context.strokeStyle = color;
    context.strokeRect(x, y, w, h);
}

function startDetection() {
    detecting = true;
    console.log('Starting detection');
    detect();
}

function stopDetection() {
    console.log('Stopping detection');
    detecting = false;
    detectedObjects = [];
    draw();
}

async function detect() {
    if (detecting) {
        // Run detection
        detectedObjects = await detector.detect(video);

        // Redraw canvas
        draw();

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
    const loadingText = document.getElementById('loadingText');
    loadingText.innerHTML = 'LOADED';
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