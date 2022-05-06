let rotation = 0;
var vid = document.getElementsByClassName("video");

function Speed03() {
  vid[0].playbackRate = 0.3;
  vid[1].playbackRate = 0.3;
}
function Speed05() {
  vid[0].playbackRate = 0.5;
  vid[1].playbackRate = 0.5;
}
function Speed07() {
  vid[0].playbackRate = 0.7;
  vid[1].playbackRate = 0.7;
}
function Speed1() {
  vid[0].playbackRate = 1;
  vid[1].playbackRate = 1;
}
function Speed15() {
  vid[0].playbackRate = 1.5;
  vid[1].playbackRate = 1.5;
}
function Speed2() {
  vid[0].playbackRate = 2;
  vid[1].playbackRate = 2;
}

function rotate() {
  rotation += 180;
  vid[0].style.transform = `rotateY(${rotation}deg)`;
  vid[1].style.transform = `rotateY(${rotation}deg)`;
}

var videoContainer = document.getElementById("videoContainer");
var video = document.getElementById("video");
var videoControls = document.getElementById("video-controls");

// Hide the default controls
video.controls = false;
vid[0].controls = false;
vid[1].controls = false;

// Display the user defined video controls
videoControls.style.display = "block";

var playpause = document.getElementById("playpause");
var stop = document.getElementById("stop");
var mute = document.getElementById("mute");
var progress = document.getElementById("progress");
var progressBar = document.getElementById("progress-bar");

playpause.addEventListener("click", function (e) {
  if (vid[0].paused || vid[0].ended) vid[0].play();
  else vid[0].pause();
});
playpause.addEventListener("click", function (e) {
  if (vid[1].paused || vid[1].ended) vid[1].play();
  else vid[1].pause();
});

stop.addEventListener("click", function (e) {
  vid[0].pause();
  vid[0].currentTime = 0;
  progress.value = 0;
});
stop.addEventListener("click", function (e) {
  vid[1].pause();
  vid[1].currentTime = 0;
  progress.value = 0;
});

mute.addEventListener("click", function (e) {
  vid[0].muted = !vid[0].muted;
});
mute.addEventListener("click", function (e) {
  vid[1].muted = !vid[1].muted;
});

video.addEventListener("loadedmetadata", function () {
  progress.setAttribute("max", video.duration);
});

video.addEventListener("timeupdate", function () {
  progress.value = video.currentTime;
  progressBar.style.width =
    Math.floor((video.currentTime / video.duration) * 100) + "%";
});

video.addEventListener("timeupdate", function () {
  progress.value = video.currentTime;
  progressBar.style.width =
    Math.floor((video.currentTime / video.duration) * 100) + "%";
});

progress.addEventListener("click", function (e) {
  var rect = this.getBoundingClientRect();
  var pos = (e.pageX - rect.left) / this.offsetWidth;
  vid[0].currentTime = pos * vid[0].duration;
});
progress.addEventListener("click", function (e) {
  var rect = this.getBoundingClientRect();
  var pos = (e.pageX - rect.left) / this.offsetWidth;
  vid[1].currentTime = pos * vid[1].duration;
});

const videoPlayer = document.querySelector(".video-player");
const currentTimeElement = videoPlayer.querySelector(".current");
const durationTimeElement = videoPlayer.querySelector(".duration");
const video2 = videoPlayer.querySelector(".video");

//current time and duration
const currentTime = () => {
  let currentMinutes = Math.floor(video2.currentTime / 60);
  let currentSeconds = Math.floor(video2.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(video2.duration / 60);
  let durationSeconds = Math.floor(video2.duration - durationMinutes * 60);

  currentTimeElement.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
  }`;
  durationTimeElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

video2.addEventListener("timeupdate", currentTime);

function change(check) {
  if (check.className == "far fa-check-circle") {
    check.className = "fas fa-check-circle";
  } else {
    check.className = "far fa-check-circle";
  }
}
