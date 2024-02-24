// Resize Canvas
const canvasDiv = document.getElementById("camera-screen");
const canvas = document.getElementById("camera-canvas");

if (((canvasDiv.clientWidth * (9/16)) == canvasDiv.clientHeight) || ((canvasDiv.clientWidth * (9/16)) < canvasDiv.clientHeight)) {
    canvas.style.width = String(canvasDiv.clientWidth) + "px";
    canvas.style.height = String(canvasDiv.clientWidth * (9/16)) + "px";
} else { //If height not big enough to meet ratio
    canvas.style.width = String(canvasDiv.clientHeight * (19/9)) + "px";
    canvas.style.height = String(canvasDiv.clientHeight) + "px";
}

// Audio Objects
const phoneAudio = new Audio("Audio-Files/phoneLady.wav");
const brownNoise25ms = new Audio("Audio-Files/25ms Brown.mp3");
const Button1Audio = new Audio("Audio-Files/Button 1.mp3");
const Button2Audio = new Audio("Audio-Files/Button 2.mp3");
const Button3Audio = new Audio("Audio-Files/Button 3.mp3");
const Button4Audio = new Audio("Audio-Files/Button 4.mp3");
const Button5Audio = new Audio("Audio-Files/Button 5.mp3");
const Button6Audio = new Audio("Audio-Files/Button 6.mp3");
const Button7Audio = new Audio("Audio-Files/Button 7.mp3");
const Button8Audio = new Audio("Audio-Files/Button 8.mp3");
const emergencyLevel0 = new Audio("Audio-Files/Emergency Level 0.mp3");
const emergencyLevel1 = new Audio("Audio-Files/Emergency Level 1.mp3");
const emergencyLevel2 = new Audio("Audio-Files/Emergency Level 2.mp3");
const emergencyLevel3 = new Audio("Audio-Files/Emergency Level 3.mp3");
const emergencyLevel4 = new Audio("Audio-Files/Emergency Level 4.mp3");
const emergencyLevel5 = new Audio("Audio-Files/Emergency Level 5.mp3");

// Camera Scene Download
const SceneCameraImage1 = new Image();
SceneCameraImage1.src = "Visual_Assets/Camera1.jpg";
const SceneCameraImage2 = new Image();
SceneCameraImage2.src = "Visual_Assets/Camera2.jpg";
const SceneCameraImage3 = new Image();
SceneCameraImage3.src = "Visual_Assets/Camera3.jpg";
const SceneCameraImage4 = new Image();
SceneCameraImage4.src = "Visual_Assets/Camera4.jpg";
const SceneCameraImage5 = new Image();
SceneCameraImage5.src = "Visual_Assets/Camera5.jpg";
const SceneCameraImage6 = new Image();
SceneCameraImage6.src = "Visual_Assets/Camera6.jpg";
const SceneCameraImage7 = new Image();
SceneCameraImage7.src = "Visual_Assets/Camera7.jpg";
const SceneCameraImage8 = new Image();
SceneCameraImage8.src = "Visual_Assets/Camera8.jpg";

// Scene Selection Class
class Scenes {
    constructor() {
        this.map = 0;
        this.camera1 = 1;
        this.camera2 = 2;
        this.camera3 = 3;
        this.camera4 = 4;
        this.camera5 = 5;
        this.camera6 = 6;
        this.camera7 = 7;
        this.camera8 = 8;
    }
}

// Settings
let calculateFPS = true;
let lowFPSWarning = false; // TODO

// Elements
const powerTextElement = document.getElementById("powerText");
const hangupButton = document.getElementById("hangupButton");
const phonePopup = document.getElementById("phone-popup");
const startButton = document.getElementById("startButton");
const startGameScreen = document.getElementById("startGameScreen");
const popupBackground = document.getElementById("popup-background");

const cameraButton1 = document.getElementById("camera-button-1");
const cameraButton2 = document.getElementById("camera-button-2");
const cameraButton3 = document.getElementById("camera-button-3");
const cameraButton4 = document.getElementById("camera-button-4");
const cameraButton5 = document.getElementById("camera-button-5");
const cameraButton6 = document.getElementById("camera-button-6");
const cameraButton7 = document.getElementById("camera-button-7");
const cameraButton8 = document.getElementById("camera-button-8");

// Game Vars
let maxFPS = 60;
let ctx = canvas.getContext("2d");
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;
let gameEpoch;
let batteryTime = 100000;
const sceneSelection = new Scenes();
let scene = 0;


// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    console.log("----- Mainloop Init -----");
    mainLoop();
}

function clear() {
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

        console.log("-- Animation Cycle Start --");
        clear();

        switch (scene) {
            case sceneSelection.camera1:
                ctx.drawImage(SceneCameraImage1, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera2:
                ctx.drawImage(SceneCameraImage2, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera3:
                ctx.drawImage(SceneCameraImage3, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera4:
                ctx.drawImage(SceneCameraImage4, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera5:
                ctx.drawImage(SceneCameraImage5, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera6:
                ctx.drawImage(SceneCameraImage6, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera7:
                ctx.drawImage(SceneCameraImage7, 0, 0, canvas.width, canvas.height);
                break;
            case sceneSelection.camera8:
                ctx.drawImage(SceneCameraImage8, 0, 0, canvas.width, canvas.height);
                break;
        }

    }
}

// On load completion
window.addEventListener('load', (event) => {
    console.log("----- Page Loaded -----");
})

startButton.addEventListener("click", function() {
    phoneAudio.play();
    startGameScreen.style.display = "none";
    phonePopup.style.display = "block";
    gameEpoch = Date.now()
    startAnimating(maxFPS);
    console.log("----- Camera Animation Requested ------");
    document.body.requestFullscreen();
});

hangupButton.addEventListener("click", function() {
    phonePopup.style.display = "none";
    popupBackground.style.display = "none";
});

cameraButton1.addEventListener("click", function() {
    scene = sceneSelection.camera1;
    Button1Audio.play();
    brownNoise25ms.play();
});
cameraButton2.addEventListener("click", function() {
    scene = sceneSelection.camera2;
    Button2Audio.play();
    brownNoise25ms.play();
});
cameraButton3.addEventListener("click", function() {
    scene = sceneSelection.camera3;
    Button3Audio.play();
    brownNoise25ms.play();
});
cameraButton4.addEventListener("click", function() {
    scene = sceneSelection.camera4;
    Button4Audio.play();
    brownNoise25ms.play();
});
cameraButton5.addEventListener("click", function() {
    scene = sceneSelection.camera5;
    Button5Audio.play();
    brownNoise25ms.play();
});
cameraButton6.addEventListener("click", function() {
    scene = sceneSelection.camera6;
    Button6Audio.play();
    brownNoise25ms.play();
});
cameraButton7.addEventListener("click", function() {
    scene = sceneSelection.camera7;
    Button7Audio.play();
    brownNoise25ms.play();
});
cameraButton8.addEventListener("click", function() {
    scene = sceneSelection.camera8;
    Button8Audio.play();
    brownNoise25ms.play();
});

// Resize Canvas
window.addEventListener("resize", (event) => {
    if (((canvasDiv.clientWidth * (9/16)) == canvasDiv.clientHeight) || ((canvasDiv.clientWidth * (9/16)) < canvasDiv.clientHeight)) {
        canvas.style.width = String(canvasDiv.clientWidth) + "px";
        canvas.style.height = String(canvasDiv.clientWidth * (9/16)) + "px";
    } else { //If height not big enough to meet ratio
        canvas.style.width = String(canvasDiv.clientHeight * (16/9)) + "px";
        canvas.style.height = String(canvasDiv.clientHeight) + "px";
    }
});
