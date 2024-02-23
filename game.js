// Audio Objects
var phoneAudio = new Audio("phoneLady.wav");
var brownNoise25ms = new Audio("25ms Brown.mp3");
var Button1Audio = new Audio("Button 1.mp3");
var Button2Audio = new Audio("Button 2.mp3");
var Button3Audio = new Audio("Button 3.mp3");
var Button4Audio = new Audio("Button 4.mp3");
var Button5Audio = new Audio("Button 5.mp3");
var Button6Audio = new Audio("Button 6.mp3");
var Button7Audio = new Audio("Button 7.mp3");
var Button8Audio = new Audio("Button 8.mp3");
var emergencyLevel0 = new Audio("Emergency Level 0.mp3");
var emergencyLevel1 = new Audio("Emergency Level 1.mp3");
var emergencyLevel2 = new Audio("Emergency Level 2.mp3");
var emergencyLevel3 = new Audio("Emergency Level 3.mp3");
var emergencyLevel4 = new Audio("Emergency Level 4.mp3");
var emergencyLevel5 = new Audio("Emergency Level 5.mp3");

// Settings
var calculateFPS = true;
var lowFPSWarning = false; // TODO

// Elements
var powerTextElement = document.getElementById("powerText");
var hangupButton = document.getElementById("hangupButton");
var phonePopup = document.getElementById("phone-popup");
var startButton = document.getElementById("startButton");
var startGameScreen = document.getElementById("startGameScreen");
var popupBackground = document.getElementById("popup-background");

var cameraButton1 = document.getElementById("camera-button-1");
var cameraButton2 = document.getElementById("camera-button-2");
var cameraButton3 = document.getElementById("camera-button-3");
var cameraButton4 = document.getElementById("camera-button-4");
var cameraButton5 = document.getElementById("camera-button-5");
var cameraButton6 = document.getElementById("camera-button-6");
var cameraButton7 = document.getElementById("camera-button-7");
var cameraButton8 = document.getElementById("camera-button-8");

// Game Vars
var maxFPS = 60;
var canvas = document.getElementById("camera-canvas");
var ctx = canvas.getContext("2d");
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
var gameEpoch;
var batteryTime = 100000;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    console.log("----- Mainloop Init -----");
    mainLoop();
}

function mainLoop() {
    // Request new Frame
    requestAnimationFrame(mainLoop)

    // Calculate FPS
    frameCount ++;
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        powerTextElement.innerText = "Power: " + String(Math.round(((batteryTime - ((now - gameEpoch) / 1000))/batteryTime)*100)) + "%";
        if ((Math.round(((batteryTime - ((now - gameEpoch) / 1000))/batteryTime)*100)) < 0) {
            document.getElementById("overlay").style.opacity = 1;
        } else if ((Math.round(((batteryTime - ((now - gameEpoch) / 1000))/batteryTime)*100)) < 50) {
            document.getElementById("overlay").style.opacity = (1-((batteryTime - ((now - gameEpoch) / 1000))/batteryTime))*0.25;
        }

    }
}

// On load completion
window.addEventListener('load', (event) => {
    console.log("----- Page Loaded -----");
})

startButton.addEventListener("click", function() {
    document.body.requestFullscreen();
    phoneAudio.play();
    startGameScreen.style.display = "none";
    phonePopup.style.display = "block";
    gameEpoch = Date.now()
    startAnimating(maxFPS);
    console.log("----- Camera Animation Requested ------");
});

hangupButton.addEventListener("click", function() {
    phonePopup.style.display = "none";
    popupBackground.style.display = "none";
});

cameraButton1.addEventListener("click", function() {
    Button1Audio.play();
    brownNoise25ms.play();
});
cameraButton2.addEventListener("click", function() {
    Button2Audio.play();
    brownNoise25ms.play();
});
cameraButton3.addEventListener("click", function() {
    Button3Audio.play();
    brownNoise25ms.play();
});
cameraButton4.addEventListener("click", function() {
    Button4Audio.play();
    brownNoise25ms.play();
});
cameraButton5.addEventListener("click", function() {
    Button5Audio.play();
    brownNoise25ms.play();
});
cameraButton6.addEventListener("click", function() {
    Button6Audio.play();
    brownNoise25ms.play();
});
cameraButton7.addEventListener("click", function() {
    Button7Audio.play();
    brownNoise25ms.play();
});
cameraButton8.addEventListener("click", function() {
    Button8Audio.play();
    brownNoise25ms.play();
});
