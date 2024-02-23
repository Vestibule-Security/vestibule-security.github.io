// Audio Objects
var phoneAudio = new Audio("phoneLady.wav");

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
