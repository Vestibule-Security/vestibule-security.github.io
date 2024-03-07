// Audio Objects
const mainTheme = new Audio("Audio-Files/Into the Void (Game Track).mp3");

var muted = true;
const muteButton = document.getElementById("muteButton");
const muteButtonIcon = document.getElementById("muteButtonIcon");

muteButton.addEventListener("click", function() {
    if (muted) {
        muted = false;
        muteButtonIcon.src = "Visual_Assets/UnMuted.svg";
        mainTheme.play();
    } else {
        mainTheme.pause();
        muteButtonIcon.src = "Visual_Assets/Muted.svg";
        muted = true;
    }
});

mainTheme.addEventListener("ended", function() {
    mainTheme.play();
})
