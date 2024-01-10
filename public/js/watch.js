const playPauseBtn = document.querySelector(".play-pause-btn");
const video = document.querySelector("video");
const videoContainer = document.querySelector(".series.episode");
const fullScreenBtn = document.querySelector(".full-screen-btn");
const pictureInPictureBtn = document.querySelector(".picture-in-picture-btn");

document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return;

  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
    case "k":
      e.preventDefault();
      togglePlay();
      break;
    case "f":
      toggleFullScreenMode();
    case "i":
      togglePictureInPictureMode();
  }
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

// Play/Pause

playPauseBtn.addEventListener("click", togglePlay);

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});
