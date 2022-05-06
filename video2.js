let rotation = 0;
const vid = document.getElementsByClassName("video");

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
// video2.getC
// video2.cl

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

function change() {
  // console.log(this);
  const i = this.children[0];
  if (i.className === "far fa-check-circle") {
    i.className = "fas fa-check-circle";
    return;
  }
  i.className = "far fa-check-circle";
}

function Upload() {
  const fileUpload = document.getElementById("fileUpload");
  const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = function (e) {
          let count = 0;
          const moveSec = [0];
          // const table = document.createElement("table");
          const rows = e.target.result.split("\n");
          for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].split(",");
            //console.log(cells);
            if (cells.length === 1) {
              count++;
              //console.log(count);

              if (count === 8) {
                moveSec.push(Number(cells[0]));
                count = 0;
              }
            }
          }
          resolve(moveSec);
        };
        reader.readAsText(fileUpload.files[0]);
      });
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}

function setVideoTime(time) {
  vid[0].currentTime = time;
  vid[1].currentTime = time;
}

async function UploadAndProcess() {
  const moveSec = await Upload();

  if (typeof moveSec === "object") {
    let innerHTML = "";

    const length = moveSec.length;

    for (let i = 0; i < length; i++) {
      innerHTML =
        innerHTML +
        `<div class="col-2 text-white" style="margin-top: 30px; display: inline-block;"><div style="background-color : brown; height: 170px; width: 140; "><img onclick="setVideoTime(${moveSec[i]})" src="./img/lisa1.png" style="margin-bottom:3%;"/><div class="container" style="text-align: center;"><span style="font-size: 20px; margin-right: 5%;">` +
        (i + 1) +
        '</span><button class="hov text-decoration-none text-white" type="button" onclick="change.call(this)" style="background: none; " ><i  class="far fa-check-circle" style="font-size: 25px;" id="check"></i></button><button class="hov text-decoration-none text-white" type="button" data-bs-toggle="modal" data-bs-target="#report"><i class="fas fa-flag" style=" font-size: 15px; margin-left: 20%;"></i></button></div></div></div>';
    }

    document.getElementById("calby").innerHTML = innerHTML;
  }
  // console.log(count);
}

var clear;

async function settime() {
  const moveSecond = await Upload();
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  var starttime = moveSecond[Number(start) - 1];
  var endtime = moveSecond[Number(end) - 1];

  vid[0].currentTime = starttime;
  vid[1].currentTime = starttime;

  vid[0].play();
  vid[1].play();
  console.log(vid[0].currentTime);
  clearInterval(clear);
  clear = setInterval(function () {
    if (vid[0].currentTime > endtime) {
      vid[0].currentTime = starttime;
      vid[1].currentTime = starttime;
      console.log(vid[0].currentTime);
    }
  }, 1000);
}

function cancle() {
  document.getElementById("start").value = null;
  document.getElementById("end").value = null;
  let j = 1;
  console.log(document.getElementById("start").value);
  if (j === 1) {
    clearInterval(clear);
    console.log(vid[0].currentTime);
  }
}
