const video = document.querySelector("video");
const videoContainer = document.querySelector(".series.episode");
const controls = document.querySelector(".controls");
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
const previewImg = document.querySelector(".preview-img");
const thumbnailImg = document.querySelector(".thumbnail-img");
const timelineContainer = document.querySelector(".timeline-container");
const playPauseArea = document.querySelector(".play-pause-area");

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
      skip(-5);
      break;
    case "arrowright":
      skip(5);
      break;
    case "c":
      toggleCaptions();
      break;
  }
});

// Hide/Show

let timeoutId;

["mousemove", "click"].forEach((event) => {
  document.addEventListener(event, function () {
    showControls();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(hideControls, 1500);
  });
});

function hideControls() {
  controls.style.display = "none";
  timelineContainer.style.display = "none";
  document.body.style.cursor = "none";
}

function showControls() {
  controls.style.display = "";
  timelineContainer.style.display = "";
  document.body.style.cursor = "auto";
}

// Play/Pause

playPauseBtn.addEventListener("click", () => togglePlay());
playPauseArea.addEventListener("click", () => togglePlay());

function togglePlay() {
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
  totalTimeElement.textContent = formatDuration(video.duration);

  const percent = video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
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
  skip(5);
});

backwardBtn.addEventListener("click", () => {
  skip(-5);
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

function lockOrientationLandscape() {
  if (screen.orientation.lock) {
    screen.orientation.lock("landscape");
  } else if (screen.lockOrientation) {
    screen.lockOrientation("landscape");
  } else if (screen.mozLockOrientation) {
    screen.mozLockOrientation("landscape");
  } else if (screen.msLockOrientation) {
    screen.msLockOrientation("landscape");
  }
}

function toggleFullScreenMode() {
  const fullscreenElement =
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement;
  if (fullscreenElement) {
    document.exitFullscreen();
    playPauseArea.classList.remove("full-screen");
  } else {
    playPauseArea.classList.add("full-screen");
    videoContainer.requestFullscreen().then(() => {
      lockOrientationLandscape();
    });
  }
}

document.addEventListener("fullscreenchange", function () {
  videoContainer.classList.toggle("full-screen", !!document.fullscreenElement);
});

let lastClickTime = 0;
let clickCount = 0;

videoContainer.addEventListener("click", function (event) {
  if (
    isDescendantOf(event.target, controls) ||
    isDescendantOf(event.target, timelineContainer)
  ) {
    return;
  }

  const currentTime = Date.now();
  const timeSinceLastClick = currentTime - lastClickTime;

  if (timeSinceLastClick < 500) {
    clickCount++;
    if (clickCount === 2) {
      event.preventDefault();
      toggleFullScreenMode();
      clickCount = 0;
    }
  } else {
    clickCount = 1;
  }

  lastClickTime = currentTime;
});

// Timeline

timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);
document.addEventListener("mouseup", (e) => {
  if (isScrubbing) {
    toggleScrubbing(e);
  }
});
document.addEventListener("mousemove", (e) => {
  if (isScrubbing) {
    handleTimelineUpdate(e);
  }
});

let isScrubbing = false;
let wasPaused;

function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) {
      video.play();
    }
  }

  handleTimelineUpdate(e);
}

function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  timelineContainer.style.setProperty("--preview-position", percent);

  if (isScrubbing) {
    e.preventDefault();
    timelineContainer.style.setProperty("--progress-position", percent);
    progressCurrentTime(percent);
  }
}

function progressCurrentTime(percent) {
  let time = totalTimeElement.textContent;
  let parts = time.split(":");

  let hours = parseInt(parts[0], 10);
  let minutes = parseInt(parts[1], 10);

  let totalMinutes = hours * 60 + minutes;
  let currentTime = totalMinutes * percent;

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  let currentTimeString =
    currentMinutes.toString().padStart(2, "0") +
    ":" +
    currentSeconds.toString().padStart(2, "0");

  currentTimeElement.textContent = currentTimeString;
}

//

function isDescendantOf(element, ancestor) {
  let node = element.parentNode;
  while (node !== null) {
    if (node === ancestor) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
