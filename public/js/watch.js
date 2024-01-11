const video = document.querySelector("video");
const videoContainer = document.querySelector(".series.episode");
const playPauseBtn = document.querySelector(".play-pause-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-container .slider");
const currentTimeElement = document.querySelector(".current-time");
const totalTimeElement = document.querySelector(".total-time");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const captionsBtn = document.querySelector(".captions-btn");
const speedBtn = document.querySelector(".speed-btn");
const pictureInPictureBtn = document.querySelector(".picture-in-picture-btn");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const qualityBtn = document.getElementById("choose-quality");

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return;

  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      if (tagName === "button") return;
      e.preventDefault();
      togglePlay();
      break;
    case "f":
      toggleFullScreenMode();
      break;
    case "i":
      togglePictureInPictureMode();
      break;
    case "arrowleft":
      skip(-10);
      break;
    case "arrowright":
      skip(10);
      break;
    case "c":
      toggleCaptions();
      break;
  }
});

// Play/Pause

videoContainer.addEventListener("click", () => togglePlay(0));
playPauseBtn.addEventListener("click", () => togglePlay(1));

function togglePlay(ignore) {
  const tagName = document.activeElement.tagName.toLowerCase();
  const formElements = ["input", "button", "textarea", "select", "p"];
  if (formElements.includes(tagName) && ignore === 0) {
    return;
  }

  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});

// Volume

muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

function toggleMute() {
  video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "mute";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

// Duration

video.addEventListener("loadeddata", () => {
  totalTimeElement.textContent = formatDuration(video.duration);
});

video.addEventListener("timeupdate", () => {
  currentTimeElement.textContent = formatDuration(video.currentTime);
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  if (hours === 0) {
    return `${leadingZeroFormatter.format(
      minutes,
    )}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${leadingZeroFormatter.format(hours)}:${leadingZeroFormatter.format(
      minutes,
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

//Skip

forwardBtn.addEventListener("click", () => {
  skip(10);
});

backwardBtn.addEventListener("click", () => {
  skip(-10);
});

function skip(duration) {
  video.currentTime += duration;
}

// Quality

var otherButtons = document.querySelector(".options");

qualityBtn.onclick = function () {
  if (otherButtons.style.display !== "none") {
    otherButtons.style.display = "none";
  } else {
    otherButtons.style.display = "flex";
  }
};

// Captions

const captions = video.textTracks[0];
captions.mode = "showing";

captionsBtn.addEventListener("click", toggleCaptions);

function toggleCaptions() {
  const isHidden = captions.mode === "hidden";
  captions.mode = isHidden ? "showing" : "hidden";
  videoContainer.classList.toggle("captions", isHidden);
}

// Speed

speedBtn.addEventListener(
  "mousedown",
  function (e) {
    switch (e.button) {
      case 0:
        changePlaybackSpeed(true);
        break;
      case 2:
        event.preventDefault();
        changePlaybackSpeed(false);
        break;
    }
  },
  false,
);

function changePlaybackSpeed(increase) {
  let adjustment = increase ? 0.25 : -0.25;
  let newPlaybackRate = video.playbackRate + adjustment;
  if (newPlaybackRate > 2 && increase) {
    newPlaybackRate = 0.25;
  } else if (newPlaybackRate < 0.25 && !increase) {
    newPlaybackRate = 2;
  }
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;
}

// Picture in Picture

pictureInPictureBtn.addEventListener("click", togglePictureInPictureMode);

function togglePictureInPictureMode() {
  if (videoContainer.classList.contains("picture-in-picture")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}

video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("picture-in-picture");
});

video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("picture-in-picture");
});

// Fullscreen

fullScreenBtn.addEventListener("click", toggleFullScreenMode);

function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    videoContainer.classList.add("full-screen");
  } else {
    videoContainer.classList.remove("full-screen");
  }
});
