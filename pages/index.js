import { useState, useEffect, useRef } from "react";

function Home() {
  // Carousel

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextIndexTime = 5000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, nextIndexTime);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const carouselItems = [
    {
      title: "WATCH S1 E1",
      mobileImageUrl:
        "/img/previews/home-preview-banner-carousel-mobile-1.webp",
      desktopImageUrl: "/img/previews/home-preview-banner-carousel-1.webp",
      titleImageUrl: "/img/previews/home-preview-banner-carousel-title-1.webp",
    },
    {
      title: "CONTINUE WATCHING S1 E10",
      mobileImageUrl:
        "/img/previews/home-preview-banner-carousel-mobile-2.webp",
      desktopImageUrl: "/img/previews/home-preview-banner-carousel-2.webp",
      titleImageUrl: "/img/previews/home-preview-banner-carousel-title-2.webp",
    },
    {
      title: "WATCH S1 E1",
      mobileImageUrl:
        "/img/previews/home-preview-banner-carousel-mobile-3.webp",
      desktopImageUrl: "/img/previews/home-preview-banner-carousel-3.webp",
      titleImageUrl: "/img/previews/home-preview-banner-carousel-title-3.webp",
    },
    {
      title: "WATCH S1 E1",
      mobileImageUrl:
        "/img/previews/home-preview-banner-carousel-mobile-4.webp",
      desktopImageUrl: "/img/previews/home-preview-banner-carousel-4.webp",
      titleImageUrl: "/img/previews/home-preview-banner-carousel-title-4.webp",
    },
    {
      title: "CONTINUE WATCHING S1 E10",
      mobileImageUrl:
        "/img/previews/home-preview-banner-carousel-mobile-5.webp",
      desktopImageUrl: "/img/previews/home-preview-banner-carousel-5.webp",
      titleImageUrl: "/img/previews/home-preview-banner-carousel-title-5.webp",
    },
  ];

  // Next/Previous

  const slidesNumbers = [0, 0, 0];
  const contentDivRefs = Array(3)
    .fill()
    .map(() => useRef(null));

  const handleNavigation = (index, direction) => {
    const currentSlideNumber = slidesNumbers[index];
    const newSlideNumber =
      direction === "previous"
        ? currentSlideNumber - 1
        : currentSlideNumber + 1;
    setSlideNumber(index, newSlideNumber);
    updateContentPosition(contentDivRefs[index], newSlideNumber, (value) =>
      setSlideNumber(index, value),
    );
  };

  // Update content position for a given ref and slide number
  function updateContentPosition(
    contentDivRef,
    currentSlideNumber,
    setSlideNumber,
  ) {
    if (window.innerWidth <= 600) {
      contentDivRef.current.style.transform = "";
      return;
    }

    const contentItems =
      contentDivRef.current.querySelectorAll(".content-item");
    const itemWidth = contentItems[0].offsetWidth;
    const itemsPerSlide = window.innerWidth <= 600 ? 1 : 4;
    const totalWidth = itemWidth * itemsPerSlide;

    let newSlideNumber = currentSlideNumber;
    if (newSlideNumber >= Math.ceil(contentItems.length / itemsPerSlide)) {
      newSlideNumber = 0;
    } else if (newSlideNumber < 0) {
      newSlideNumber = Math.floor(contentItems.length / itemsPerSlide);
    }

    const newTransformValue =
      newSlideNumber === 0 ? "50px" : `-${newSlideNumber * totalWidth}px`;
    contentDivRef.current.style.transform = `translateX(${newTransformValue})`;

    setSlideNumber(newSlideNumber);
  }

  // Function to set slide number
  const setSlideNumber = (index, value) => {
    slidesNumbers[index] = value;
  };

  const airedTodayItems = [
    {
      id: 1,
      coverImage: "/img/previews/home-preview-aired-today-1.webp",
      ageRating: "/svg/A12.svg",
      title: "Frieren: Beyound Journey's End",
      subDub: "Sub | Dub",
      url: "/series/sousou-no-frieren/1",
    },
    {
      id: 2,
      coverImage: "/img/previews/home-preview-aired-today-2.webp",
      ageRating: "/svg/A16.svg",
      title: "Delicious in Dungeon",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 3,
      title: "Clannad",
      coverImage: "/img/previews/home-preview-aired-today-3.webp",
      ageRating: "/svg/A12.svg",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 4,
      title: "Dr. Stone",
      coverImage: "/img/previews/home-preview-aired-today-4.webp",
      ageRating: "/svg/A14.svg",
      subDub: "Sub | Dub",
      url: "",
    },
  ];

  const suggestionsItems = [
    {
      id: 1,
      title: "Code Geass",
      coverImage: "/img/previews/home-preview-suggestions-1.webp",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 2,
      title: "Spy x Family 2",
      coverImage: "/img/previews/home-preview-suggestions-2.webp",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 3,
      title: "Jujutsu Kaisen 2",
      coverImage: "/img/previews/home-preview-suggestions-3.webp",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 4,
      title: "Bocchi The Rock!",
      coverImage: "/img/previews/home-preview-suggestions-4.webp",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 5,
      title: "Attack on Titan: Final Season - The Final Chapters",
      coverImage: "/img/previews/home-preview-suggestions-5.webp",
      subDub: "Sub | Dub",
      url: "",
    },
    {
      id: 6,
      title: "Vinland Saga Season 2",
      coverImage: "/img/previews/home-preview-suggestions-6.webp",
      subDub: "Sub | Dub",
      url: "",
    },
  ];

  const recentlyAddedItems = [
    {
      id: 1,
      title: "Suzume",
      coverImage: "/img/previews/home-preview-recently-added-1.webp",
      ageRating: "/svg/A12.svg",
      subDub: "Sub | Dub",
      url: "",
    },
  ];

  // Scroll to element

  const scrollToElement = (className) => {
    const element = document.getElementsByClassName(className)[0];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.error(`Elements with class "${className}" not found`);
    }
  };

  return (
    <main>
      <div className="home-preview banner-carousel">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <picture>
              <source
                media="(max-width:  799px)"
                srcSet={item.mobileImageUrl}
              />
              <source
                media="(min-width:  800px)"
                srcSet={item.desktopImageUrl}
              />
              <img
                id="background-img"
                src={item.desktopImageUrl}
                alt={item.altText}
              />
            </picture>
            <div className="carousel-content">
              <img
                id="title-img"
                src={item.titleImageUrl}
                alt={item.titleAltText}
              />
              <div className="interact">
                <button>
                  <img src="/svg/play.svg" alt="Play" />
                  <p>{item.title}</p>
                </button>
                <button id="big-icon">
                  <img src="/svg/bookmark.svg" alt="Bookmark" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="home-preview banner-carousel gradient"></div>
      <div className="home-preview banner-carousel spacement"></div>

      <div className="category-header">
        <h1>Aired Today</h1>
      </div>
      <div className="home-preview next-previous aired-today">
        <div ref={contentDivRefs[0]} className="content">
          {airedTodayItems.map((item, index) => (
            <div
              key={item.id}
              className={`content-item ${
                slidesNumbers[0] === index ? "active" : ""
              }`}
            >
              <div className="container">
                <a href={item.url}>
                  <img id="cover" src={item.coverImage} alt={item.title} />
                </a>
                <div className="age-rating">
                  <img src={item.ageRating} alt="Age Rating" />
                </div>
                <div className="add-to-watch-list">
                  <img src="/svg/bookmark.svg" alt="Add to Watchlist" />
                </div>
                <p id="title">{item.title}</p>
                <h5>{item.subDub}</h5>
              </div>
            </div>
          ))}
        </div>
        <img
          id="previous"
          src="/svg/previous.svg"
          onClick={() => handleNavigation(0, "previous")}
        />
        <img
          id="next"
          src="/svg/next.svg"
          onClick={() => handleNavigation(0, "next")}
        />
      </div>
      <div className="category-header">
        <h1 id="category-title">Navigate</h1>
      </div>
      <div className="home-preview navigator">
        <div className="content">
          <button onClick={() => scrollToElement("banner-carousel")}>
            Start
          </button>
          <button onClick={() => scrollToElement("aired-today")}>
            Aired Today
          </button>
          <button onClick={() => scrollToElement("keep-watching")}>
            Keep Watching
          </button>
          <button onClick={() => scrollToElement("suggestions")}>
            Suggestions
          </button>
          <button onClick={() => scrollToElement("watch-list")}>
            Watchlist
          </button>
          <button onClick={() => scrollToElement("recently-added")}>
            Recently Added
          </button>
        </div>
      </div>
      <div className="category-header">
        <h1>Keep Watching</h1>
        <a href="">More episodes</a>
      </div>
      <div className="home-preview video keep-watching">
        <div className="content">
          <a
            href="/series/sousou-no-frieren/watch/1/6"
            className="content-item"
          >
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-1.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
              <div className="video-length">8m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "2%" }}
              ></div>
            </div>
            <h6>FRIEREN: BEYOND JOURNEY'S END</h6>
            <p>S1 E6 - The Hero of the Village</p>
            <h5>Sub | Dub</h5>
          </a>
          <a href="" className="content-item">
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-2.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A16.svg" />
              </div>
              <div className="video-length">14m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "45%" }}
              ></div>
            </div>
            <h6>VINLAND SAGA</h6>
            <p>S2 E8 - An Empty Man</p>
            <h5>Sub | Dub</h5>
          </a>
          <a href="" className="content-item">
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-3.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
              <div className="video-length">21m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "5%" }}
              ></div>
            </div>
            <h6>YURUYURI</h6>
            <p>S1 E4 - Summer Harvest</p>
            <h5>Subtitled</h5>
          </a>
          <a href="" className="content-item">
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-4.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
              <div className="video-length">10m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "55%" }}
              ></div>
            </div>
            <h6>MY HERO ACADEMIA</h6>
            <p>S6 E134 - The Lovely Lady Nagant</p>
            <h5>Sub | Dub</h5>
          </a>
          <a href="" className="content-item">
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-5.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
              <div className="video-length">8m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "75%" }}
              ></div>
            </div>
            <h6>SOUND EUPHONIUM</h6>
            <p>S2 E1 - Mid-summer Fanfare</p>
            <h5>Subtitled</h5>
          </a>
          <a href="" className="content-item">
            <div className="video-preview">
              <img
                id="thumbnail"
                src="/img/previews/home-preview-keep-watching-6.webp"
              />
              <div className="hidden-preview">
                <div className="play-img">
                  <img src="/svg/play.svg" />
                </div>
              </div>
              <div className="age-rating">
                <img src="/svg/A16.svg" />
              </div>
              <div className="video-length">17m left</div>
              <div className="progress-bar-base"></div>
              <div
                className="progress-bar-active"
                style={{ width: "16%" }}
              ></div>
            </div>
            <h6>TO YOUR ETERNITY</h6>
            <p>S2 E18 - Death of a Deathless</p>
            <h5>Sub | Dub</h5>
          </a>
        </div>
      </div>
      <div className="category-header">
        <h1>You Might Like</h1>
      </div>
      <div className="home-preview next-previous suggestions">
        <div ref={contentDivRefs[1]} className="content">
          {suggestionsItems.map((item, index) => (
            <div
              key={item.id}
              className={`content-item ${
                slidesNumbers[1] === index ? "active" : ""
              }`}
            >
              <div className="container">
                <a href={item.url}>
                  <img id="big-cover" src={item.coverImage} alt={item.title} />
                  <p id="title">{item.title}</p>
                  <h5>{item.subDub}</h5>
                </a>
              </div>
            </div>
          ))}
        </div>
        <img
          id="previous"
          src="/svg/previous.svg"
          onClick={() => handleNavigation(1, "previous")}
        />
        <img
          id="next"
          src="/svg/next.svg"
          onClick={() => handleNavigation(1, "next")}
        />
      </div>
      <div className="category-header">
        <h1>Watchlist</h1>
        <a href="">More episodes</a>
      </div>
      <div className="home-preview video watch-list">
        <div className="content">
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-1.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
            </div>
            <p>Sound! Euphonium</p>
            <h5>Sub | Dub</h5>
          </div>
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-2.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A14.svg" />
              </div>
            </div>
            <p>KAGUYA-SAMA: LOVE IS WAR</p>
            <h5>Sub | Dub</h5>
          </div>
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-3.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A10.svg" />
              </div>
            </div>
            <p>Your lie in April</p>
            <h5>Sub | Dub</h5>
          </div>
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-4.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
            </div>
            <p>Golden Time</p>
            <h5>Sub | Dub</h5>
          </div>
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-5.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A16.svg" />
              </div>
            </div>
            <p>Attack on Titan</p>
            <h5>Sub | Dub</h5>
          </div>
          <div className="content-item">
            <div className="video-preview">
              <a href="">
                <img
                  id="thumbnail"
                  src="/img/previews/home-preview-watch-list-6.webp"
                />
              </a>
              <div className="hidden-preview">
                <a href="" className="add-to-watch-list">
                  <img src="/svg/bookmark-filled.svg" />
                </a>
                <a href="">
                  <div className="play-img">
                    <img src="/svg/play.svg" />
                  </div>
                </a>
              </div>
              <div className="age-rating">
                <img src="/svg/A12.svg" />
              </div>
            </div>
            <p>Black Clover</p>
            <h5>Sub | Dub</h5>
          </div>
        </div>
      </div>
      <div className="category-header">
        <h1>Recently Added</h1>
      </div>
      <div className="home-preview next-previous recently-added">
        <div ref={contentDivRefs[2]} className="content">
          {recentlyAddedItems.map((item, index) => (
            <div
              key={item.id}
              className={`content-item ${
                slidesNumbers[2] === index ? "active" : ""
              }`}
            >
              <div className="container">
                <a href={item.url}>
                  <img id="cover" src={item.coverImage} alt={item.title} />
                </a>
                <div className="age-rating">
                  <img src={item.ageRating} alt="Age Rating" />
                </div>
                <div className="add-to-watch-list">
                  <img src="/svg/bookmark.svg" alt="Add to Watchlist" />
                </div>
                <p id="title">{item.title}</p>
                <h5>{item.subDub}</h5>
              </div>
            </div>
          ))}
        </div>
        <img
          id="previous"
          src="/svg/previous.svg"
          onClick={() => handleNavigation(2, "previous")}
        />
        <img
          id="next"
          src="/svg/next.svg"
          onClick={() => handleNavigation(2, "next")}
        />
      </div>
    </main>
  );
}

export default Home;
