import { useState, useEffect, useRef } from "react";

export default function Watch() {
  // SERIES
  // Window
  const continueWatchingUrl = () => {
    const url = "/series/sousou-no-frieren/watch/1/6";
    window.location.assign(url);
  };

  // Title size
  const [titleFontSize, setTitleFontSize] = useState("3em");

  useEffect(() => {
    function adjustInfoTitle() {
      const h1 = document.querySelector(".series .info h1");
      const charCount = h1.innerText.length;
      const maxCharValue = window.innerWidth <= 600 ? 9 : 36;
      const bigFontSize = "3em";
      const smallFontSize = window.innerWidth <= 600 ? "1.5em" : "2em";

      if (charCount <= maxCharValue) {
        setTitleFontSize(bigFontSize);
      } else if (charCount > maxCharValue) {
        setTitleFontSize(smallFontSize);
      }
    }

    window.addEventListener("load", adjustInfoTitle);
    window.addEventListener("resize", adjustInfoTitle);

    return () => {
      window.removeEventListener("load", adjustInfoTitle);
      window.removeEventListener("resize", adjustInfoTitle);
    };
  }, []);

  // More/Fewer details
  const [showDetails, setShowDetails] = useState(false);
  const [detailsIsActive, setDetailsIsActive] = useState(false);

  const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails);
    setDetailsIsActive(!detailsIsActive);
  };

  // Filter
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Series table info
  const infoTable = [
    {
      Publisher: "Aniplex of America",
      Audio: "Japanese, English",
      Subtitles: "English",
      ContentAdvisory: "A12, Legal Drugs, Fantasy Violence",
    },
  ];

  // WATCH
  // Refs for the video and other elements
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const timelineContainerRef = useRef(null);

  // Player state variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Event handler for keydown events
  useEffect(() => {
    const handleKeyDown = (e) => {
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
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Hide/Show
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const showControls = () => {
      clearTimeout(timeoutId);
      setControlsVisible(true);

      timeoutId = setTimeout(hideControls, 2000);
    };

    const hideControls = () => {
      setControlsVisible(false);
    };

    window.addEventListener("mousemove", showControls);
    window.addEventListener("click", showControls);

    timeoutId = setTimeout(hideControls, 2000);

    return () => {
      clearTimeout(timeoutId);

      window.removeEventListener("mousemove", showControls);
      window.removeEventListener("click", showControls);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = controlsVisible ? "auto" : "none";
  }, [controlsVisible]);

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Volume
  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  useEffect(() => {
    const video = videoRef.current;

    const handleVolumeChangeFromVideo = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener("volumechange", handleVolumeChangeFromVideo);

    return () => {
      video.removeEventListener("volumechange", handleVolumeChangeFromVideo);
    };
  }, []);

  useEffect(() => {
    const videoContainer = document.querySelector(".series.episode");
    let volumeLevel;

    if (isMuted || volume === 0) {
      volumeLevel = "mute";
    } else if (volume >= 0.5) {
      volumeLevel = "high";
    } else {
      volumeLevel = "low";
    }

    videoContainer.dataset.volumeLevel = volumeLevel;
  }, [volume, isMuted]);

  const updateVolumeIcon = () => {
    if (isMuted || volume <= 0) {
      return <img className="volume-mute-icon" src="/svg/0-volume.svg" />;
    } else if (volume > 0 && volume <= 0.5) {
      return <img className="volume-low-icon" src="/svg/50-volume.svg" />;
    } else {
      return <img className="volume-high-icon" src="/svg/100-volume.svg" />;
    }
  };

  // Duration
  const handleLoadedData = () => {
    const video = videoRef.current;
    setDuration(video.duration);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  useEffect(() => {
    const video = videoRef.current;

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
      return `${leadingZeroFormatter.format(
        minutes,
      )}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${leadingZeroFormatter.format(
        hours,
      )}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
        seconds,
      )}`;
    }
  };

  // Skip
  const skip = (duration) => {
    setCurrentTime((prevTime) => prevTime + duration);
  };

  const handleSkipForward = () => {
    skip(5);
  };

  const handleSkipBackward = () => {
    skip(-5);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.currentTime = currentTime;
  }, [currentTime]);

  // Quality
  const [qualityOptionsVisible, setQualityOptionsVisible] = useState(false);

  const toggleQualityOptions = () => {
    setQualityOptionsVisible((visible) => !visible);
  };

  // Captions
  const [areCaptionsVisible, setAreCaptionsVisible] = useState(true);

  const toggleCaptions = () => {
    const video = videoRef.current;
    const captionsTrack = video.textTracks[0];
    captionsTrack.mode = areCaptionsVisible ? "hidden" : "showing";
    setAreCaptionsVisible(!areCaptionsVisible);
  };

  useEffect(() => {
    const video = videoRef.current;
    const captionsTrack = video.textTracks[0];
    captionsTrack.mode = "showing";
  }, []);

  useEffect(() => {
    const videoContainer = document.querySelector(".series.episode");
    videoContainer.classList.toggle("captions", areCaptionsVisible);
  }, [areCaptionsVisible]);

  // Speed
  const [playbackRate, setPlaybackRate] = useState(1);

  const changePlaybackSpeed = (increase) => {
    let adjustment = increase ? 0.25 : -0.25;
    let newPlaybackRate = playbackRate + adjustment;

    if (newPlaybackRate > 2) {
      newPlaybackRate = 0.25;
    } else if (newPlaybackRate < 0.25) {
      newPlaybackRate = 2;
    }

    setPlaybackRate(newPlaybackRate);
    videoRef.current.playbackRate = newPlaybackRate;
  };

  const handleSpeedMouseDown = (e) => {
    if (e.button === 0) {
      changePlaybackSpeed(true);
    } else if (e.button === 2) {
      e.preventDefault();
      changePlaybackSpeed(false);
    }
  };

  // Picture in Picture
  const [isInPictureInPictureMode, setIsInPictureInPictureMode] =
    useState(false);

  const togglePictureInPictureMode = async () => {
    if (!document.pictureInPictureElement) {
      try {
        await videoRef.current.requestPictureInPicture();
        setIsInPictureInPictureMode(true);
      } catch (error) {
        console.error("Picture-in-Picture mode failed: ", error);
      }
    } else {
      document.exitPictureInPicture().catch(console.error);
      setIsInPictureInPictureMode(false);
    }
  };

  useEffect(() => {
    const videoContainer = document.querySelector(".series.episode");
    videoContainer.classList.toggle(
      "picture-in-picture",
      isInPictureInPictureMode,
    );
  }, [isInPictureInPictureMode]);

  // Fullscreen
  const [isFullScreen, setIsFullScreen] = useState(false);

  const lockOrientationLandscape = () => {
    if (screen.orientation?.lock) {
      screen.orientation.lock("landscape");
    } else if (screen.lockOrientation) {
      screen.lockOrientation("landscape");
    } else if (screen.mozLockOrientation) {
      screen.mozLockOrientation("landscape");
    } else if (screen.msLockOrientation) {
      screen.msLockOrientation("landscape");
    }
  };

  const toggleFullScreenMode = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().then(() => {
        lockOrientationLandscape();
        setIsFullScreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      });
    }
  };

  // Timeline
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [wasPaused, setWasPaused] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      handleTimelineUpdate(e);
    };

    const handleMouseDown = (e) => {
      toggleScrubbing(e);
    };

    const handleMouseUp = (e) => {
      if (isScrubbing) {
        toggleScrubbing(e);
      }
    };

    if (timelineContainerRef.current) {
      timelineContainerRef.current.addEventListener(
        "mousemove",
        handleMouseMove,
      );
      timelineContainerRef.current.addEventListener(
        "mousedown",
        handleMouseDown,
      );
    }

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (timelineContainerRef.current) {
        timelineContainerRef.current.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
        timelineContainerRef.current.removeEventListener(
          "mousedown",
          handleMouseDown,
        );
      }
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isScrubbing]);

  const toggleScrubbing = (e) => {
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    setIsScrubbing((e.buttons & 1) === 1);
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.toggle("scrubbing", isScrubbing);
    }
    if (isScrubbing) {
      setWasPaused(videoRef.current.paused);
      videoRef.current.pause();
    } else {
      videoRef.current.currentTime = percent * videoRef.current.duration;
      if (!wasPaused) {
        videoRef.current.play();
      }
    }
    handleTimelineUpdate(e);
  };

  const handleTimelineUpdate = (e) => {
    const rect = timelineContainerRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;

    const currentIsScrubbing = isScrubbing;

    if (timelineContainerRef.current) {
      timelineContainerRef.current.style.setProperty(
        "--preview-position",
        percent,
      );
    }

    if (currentIsScrubbing) {
      if (timelineContainerRef.current) {
        timelineContainerRef.current.style.setProperty(
          "--progress-position",
          percent,
        );
      }
      progressCurrentTime(percent);
    }
  };

  function progressCurrentTime(percent) {
    if (isFinite(videoRef.current.duration)) {
      const currentTimeInSeconds = videoRef.current.duration * percent;

      videoRef.current.currentTime = currentTimeInSeconds;
    }
  }

  return (
    <main>
      <div
        ref={videoContainerRef}
        className={`series episode 
        ${areCaptionsVisible ? "captions" : ""}  
        ${isPlaying ? "" : "paused"} 
        ${isFullScreen ? "full-screen" : ""}
        `}
        data-volume-level={isMuted ? "mute" : volume >= 0.5 ? "high" : "low"}
      >
        <div
          className="video-controls"
          style={{ display: controlsVisible ? "" : "none" }}
        >
          <div
            ref={timelineContainerRef}
            className="timeline-container"
            style={{ display: controlsVisible ? "" : "none" }}
          >
            <div className="timeline">
              <div className="thumb-indicator"></div>
            </div>
          </div>
          <div
            className={`play-pause-area ${isFullScreen ? "full-screen" : ""}`}
            onClick={togglePlay}
            onDoubleClick={toggleFullScreenMode}
          ></div>
          <div className="controls">
            <div className="left">
              <button className="play-pause-btn" onClick={togglePlay}>
                {isPlaying ? (
                  <img className="paused-icon" src="/svg/pause.svg" />
                ) : (
                  <img className="play-icon" src="/svg/play.svg" />
                )}
              </button>
              <div className="volume-container">
                <button className="mute-btn" onClick={toggleMute}>
                  {updateVolumeIcon()}
                </button>
                <input
                  className="slider"
                  type="range"
                  min="0"
                  max="1"
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
              <div className="duration-container">
                <div className="current-time">
                  {formatDuration(currentTime)}
                </div>
                /<div className="total-time">{formatDuration(duration)}</div>
              </div>
              <button className="backward-btn" onClick={handleSkipBackward}>
                <img src="/svg/backward.svg" />
              </button>
              <button className="forward-btn" onClick={handleSkipForward}>
                <img src="/svg/forward.svg" />
              </button>
            </div>
            <div className="right">
              <div className="quality wide">
                <button id="choose-quality" onClick={toggleQualityOptions}>
                  1080p
                </button>
              </div>
              <div
                className="quality-options"
                style={{ display: qualityOptionsVisible ? "flex" : "none" }}
              >
                <button className="full-hd-btn">1080p</button>
                <button className="hd-btn">720p</button>
                <button className="sd-btn">480p</button>
              </div>
              <button className="captions-btn" onClick={toggleCaptions}>
                <img src="/svg/caption.svg" />
              </button>
              <button className="speed-btn" onMouseDown={handleSpeedMouseDown}>
                {playbackRate}x
              </button>
              <button
                className="picture-in-picture-btn"
                onClick={togglePictureInPictureMode}
              >
                <img
                  className={`${
                    isInPictureInPictureMode
                      ? "picture-in-picture-out-icon"
                      : "picture-in-picture-in-icon"
                  }`}
                  src={
                    isInPictureInPictureMode
                      ? "/svg/picture-in-picture-out.svg"
                      : "/svg/picture-in-picture-in.svg"
                  }
                />
              </button>
              <button
                class="full-screen-btn"
                className={`${isFullScreen ? "full-screen" : ""}`}
                onClick={toggleFullScreenMode}
              >
                <img
                  class="full-screen-in-icon"
                  src="/svg/full-screen-in.svg"
                />
                <img
                  class="full-screen-out-icon"
                  src="/svg/full-screen-out.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <video ref={videoRef} className="video">
          <source src="/videos/gseryh.mp4" />
          <track kind="subtitles" srcLang="en" src="/videos/gseryh-en.vtt" />
          <track kind="subtitles" srcLang="jp" src="/videos/gseryh-jp.vtt" />
          This browser don't support .mp4 files.
        </video>
      </div>
      <div className="series head">
        <div className={`info ${detailsIsActive ? "active" : ""}`}>
          <a id="series-link" href="/series/sousou-no-frieren/1">
            Frieren: Beyond Journey's End
          </a>
          <h1>S1 E6 - The Hero of the Village</h1>
          <p>Released on Oct 13, 2023</p>
          <div className="rating">
            <select name="episode-grade" id="episode-grade">
              <option value="undefined">Rating</option>
              <option value="5">5. Excellent</option>
              <option value="4">4. Good</option>
              <option value="3">3. Fair</option>
              <option value="2">2. Bad</option>
              <option value="1">1. Poor</option>
            </select>
            <div id="spacement">|</div>
            <p>
              Average rating: <strong>4.7 (12k)</strong>
            </p>
          </div>
          <p>
            Frieren and Fern enlist Stark's help to fight the solar dragon - but
            is he up to the task?
          </p>
          <div className="details">
            <div className="genres">
              <a href="" className="genre">
                ADVENTURE
              </a>
              <a href="" className="genre">
                DRAMA
              </a>
              <a href="" className="genre">
                FANTASY
              </a>
            </div>
            <table>
              <tbody>
                {infoTable.map((row, index) => (
                  <>
                    <tr key={`${index}-publisher`}>
                      <td>Publisher</td>
                      <td>{row.Publisher}</td>
                    </tr>
                    <tr key={`${index}-audio`}>
                      <td>Audio</td>
                      <td>{row.Audio}</td>
                    </tr>
                    <tr key={`${index}-subtitles`}>
                      <td>Subtitles</td>
                      <td>{row.Subtitles}</td>
                    </tr>
                    <tr key={`${index}-contentAdvisory`}>
                      <td>Content Advisory</td>
                      <td>{row.ContentAdvisory}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="more-details"
            style={{ display: !showDetails ? "block" : "none" }}
            onClick={toggleDetailsVisibility}
          >
            More details...
          </div>
          <div
            className="fewer-details"
            style={{ display: showDetails ? "block" : "none" }}
            onClick={toggleDetailsVisibility}
          >
            Fewer details...
          </div>
        </div>
        <div className="watch episode">
          <a href="" className="preview">
            <img
              id="episode-preview"
              src="/img/previews/series-sousou-no-frieren-preview-ep-7.webp"
            />
            <img id="play-preview" src="/svg/play.svg" />
          </a>
          <button onClick="window.location.href=''">
            <img src="/svg/play.svg" />
            NEXT EPISODE S1 E7
          </button>
        </div>
      </div>
      <div className="series spacement">
        <div className="border"></div>
      </div>
      <div className="series comments">
        <div className="write-comment">
          <h2>Write a comment</h2>
          <form action="">
            <textarea
              name="write-review-textarea"
              id="write-review-textarea"
              rows="5"
            ></textarea>
            <div className="buttons">
              <button type="reset">CANCEL</button>
              <button type="submit">POST</button>
            </div>
          </form>
        </div>
        <div className="header">
          <div className="comments-count">7 comments</div>
          <div id="spacement">|</div>
          <div className="filter" onClick={toggleOptions}>
            <img src="/svg/filter.svg" alt="Filter icon" />
            <div
              className="options"
              style={{ display: showOptions ? "block" : "none" }}
            >
              <button id="newest">Newest</button>
              <button id="oldest">Oldest</button>
            </div>
          </div>
        </div>
        <div className="comments">
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>Osvaldo</p>
                  </a>
                </div>

                <div className="review-date">01/09/2024</div>
              </div>
              <div className="content">
                <p id="text">perfect</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>Alex_Rocks23</p>
                  </a>
                </div>

                <div className="review-date">01/10/2024</div>
              </div>
              <div className="content">
                <p id="text">nice!</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>AnimeFanatic99</p>
                  </a>
                </div>

                <div className="review-date">01/11/2024</div>
              </div>
              <div className="content">
                <p id="text">never get bored of the op</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>MysteryViewer42</p>
                  </a>
                </div>

                <div className="review-date">01/12/2024</div>
              </div>
              <div className="content">
                <p id="text">tbh, one of my favorite episodes</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>SakuraDreamer</p>
                  </a>
                </div>

                <div className="review-date">01/13/2024</div>
              </div>
              <div className="content">
                <p id="text">ed gets better every episode</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>EpicOtaku98</p>
                  </a>
                </div>

                <div className="review-date">01/14/2024</div>
              </div>
              <div className="content">
                <p id="text">so chill</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <div className="left">
              <div className="profile">
                <a href="">
                  <img
                    id="logo"
                    src="/img/previews/series-reviews-logo-1.webp"
                  />
                </a>
              </div>
            </div>
            <div className="right">
              <div className="user-info">
                <div className="username">
                  <a href="">
                    <p>CuriousMind23</p>
                  </a>
                </div>

                <div className="review-date">01/15/2024</div>
              </div>
              <div className="content">
                <p id="text">waiting for a bad episode</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>1</p>
                  </div>
                  <div className="dislike">
                    <img src="/svg/dislike.svg" />
                    <p>0</p>
                  </div>
                  <div className="more">
                    <img src="/svg/more.svg" />
                    <p>More</p>
                    <div className="options" style={{ display: "none" }}>
                      <p id="spoiler">It's a spoiler</p>
                      <p id="report">Report</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="load-more">Load More</button>
        </div>
      </div>
      <div className="series spacement">
        <div className="border"></div>
      </div>
    </main>
  );
}
