import { useState, useEffect } from "react";

export default function Series() {
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

  // Select season
  const handleSeasonChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const url = selectedOption.getAttribute("data-url");
    seasonNavigate(url);
  };

  const seasonNavigate = (url) => {
    window.location.assign(url);
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

  return (
    <main>
      <div className="series banner">
        <div
          className="background-image"
          style={{
            backgroundImage: 'url("/img/previews/series-preview-1.webp")',
          }}
        ></div>
        <picture>
          <source
            media="(max-width: 600px)"
            srcSet="/img/previews/series-preview-mobile-1.webp"
          />
          <source
            media="(min-width: 601px)"
            srcSet="/img/previews/series-preview-1.webp"
          />
          <img id="background-img" src="/img/previews/series-preview-1.webp" />
        </picture>
      </div>
      <div className="series head">
        <div className={`info ${detailsIsActive ? "active" : ""}`}>
          <h1 style={{ fontSize: titleFontSize }}>
            Frieren: Beyond Journey's End
          </h1>
          <div className="rating">
            <select name="series-grade" id="series-grade">
              <option value="undefined">Undefined</option>
              <option value="10">10. Masterpiece</option>
              <option value="9">9. Outstanding</option>
              <option value="8">8. Excellent</option>
              <option value="7">7. Very Good</option>
              <option value="6">6. Good</option>
              <option value="5">5. Decent</option>
              <option value="4">4. Average</option>
              <option value="3">3. Below Average</option>
              <option value="2">2. Mediocre</option>
              <option value="1">1. Trash</option>
            </select>
            <p id="spacement">|</p>
            <p>
              Average rating: <strong>9.4 (82k)</strong>
            </p>
            <p id="spacement">|</p>
            <p>1218 reviews</p>
          </div>
          <div className="actions">
            <button className="watch-list">
              <img src="/svg/bookmark.svg" />
              WATCHLIST
            </button>
            <a href="" className="playlist">
              <img src="/svg/add.svg" />
              PLAYLIST
            </a>
          </div>
          <p>
            After the party of heroes defeated the Demon King, they restored
            peace to the land and returned to lives of solitude. Generations
            pass, and the elven mage Frieren comes face to face with humanity’s
            mortality. She takes on a new apprentice and promises to fulfill old
            friends’ dying wishes. Can an elven mind make peace with the nature
            of life and death? Frieren embarks on her quest to find out.
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
        <div className="episode">
          <a href="/series/sousou-no-frieren/watch/1/6" className="preview">
            <img
              id="episode-preview"
              src="/img/previews/series-sousou-no-frieren-preview-ep-6.webp"
            />
            <img id="play-preview" src="/svg/play.svg" />
          </a>
          <button onClick={continueWatchingUrl}>
            <img src="/svg/play.svg" />
            CONTINUE WATCHING S1 E6
          </button>
        </div>
      </div>
      <div className="series spacement">
        <div className="border"></div>
      </div>
      <div className="series navigation">
        <div className="seasons">
          <select
            onChange={handleSeasonChange}
            name="series-seasons"
            id="series-seasons"
          >
            <option defaultValue disabled value="">
              Seasons
            </option>
            <option value="1" data-url="/series/sousou-no-frieren/1">
              S1. Frieren: Beyond Journey's End
            </option>
            <option value="2" data-url="/series/sousou-no-frieren/2">
              S2. Frieren: Beyond Journey's End
            </option>
          </select>
        </div>
        <div className="episodes">
          <a href="" className="content-item">
            <div className="image">
              <img
                id="watched"
                src="/img/previews/series-sousou-no-frieren-preview-ep-1.webp"
              />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">Watched</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E1 - The Journey's End</p>
              <h5>09/29/2023</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img
                id="watched"
                src="/img/previews/series-sousou-no-frieren-preview-ep-2.webp"
              />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">Watched</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E2 - It Didn't Have to Be Magic</p>
              <h5>09/29/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img
                id="watched"
                src="/img/previews/series-sousou-no-frieren-preview-ep-3.webp"
              />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">Watched</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E3 - Killing Magic</p>
              <h5>09/29/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img
                id="watched"
                src="/img/previews/series-sousou-no-frieren-preview-ep-4.webp"
              />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">Watched</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E4 - The Land Where Souls Rest</p>
              <h5>09/29/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img
                id="watched"
                src="/img/previews/series-sousou-no-frieren-preview-ep-5.webp"
              />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">Watched</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E5 - Phantoms of the Dead</p>
              <h5>10/06/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a
            href="/series/sousou-no-frieren/watch/1/6"
            className="content-item"
          >
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-6.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">8m left</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E6 - The Hero of the Village</p>
              <h5>10/13/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-7.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E7 - Like a Fairy Tale</p>
              <h5>10/20/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-8.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E8 - Frieren the Slayer</p>
              <h5>10/27/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-9.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E9 - Aura the Guillotine</p>
              <h5>11/03/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-10.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E10 - A Powerful Mage</p>
              <h5>11/10/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-11.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E11 - Winter in the Northen Lands</p>
              <h5>11/17/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-12.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E12 - A Real Hero</p>
              <h5>11/24/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-13.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E13 - Aversion to One's Own Kind</p>
              <h5>12/01/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-14.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E14 - Privilege of the Young</p>
              <h5>12/08/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-15.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E15 - Smells Like Trouble</p>
              <h5>12/15/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-16.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E16 - Long-Lived Friends</p>
              <h5>12/22/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
          <a href="" className="content-item">
            <div className="image">
              <img src="/img/previews/series-sousou-no-frieren-preview-ep-17.webp" />
              <img id="play-preview" src="/svg/play.svg" />
              <div className="details">
                <img id="age-rating" src="/svg/A12.svg" />
                <p id="video-length">24m</p>
              </div>
            </div>
            <div className="info">
              <p>S1 E17 - Take Care</p>
              <h5>01/05/2019</h5>
              <h6>Dub English | Sub</h6>
            </div>
          </a>
        </div>
      </div>
      <div className="series spacement">
        <div className="border"></div>
      </div>
      <div className="series reviews">
        <div className="write-review">
          <h2>Write your own review</h2>
          <form action="">
            <label htmlFor="review-title">Title</label>
            <input type="text" name="review-title" id="review-title" />
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
          <div className="review-count">441 Reviews</div>
          <div id="spacement">|</div>
          <div className="rating">9.4 (82k)</div>
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
        <div className="reviews-comments">
          <div className="reviews-comment">
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
                <div className="user-reviews">(78 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 10 (Masterpiece)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/09/2024</div>
              </div>
              <div className="content">
                <h2 id="title">PERFECTTTTTTTT</h2>
                <p id="text">PERFECTTTTTTTT</p>
                <div className="actions">
                  <div className="like">
                    <img src="/svg/like.svg" />
                    <p>17</p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(42 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 9 (Outstanding)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/10/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Amazing Animation!</h2>
                <p id="text">
                  Sousou no Friren's animation is mind-blowing. Can't get
                  enough!
                </p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(56 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 10 (Masterpiece)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/11/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Hooked from Episode 1!</h2>
                <p id="text">
                  Sousou no Friren is pure gold. Instantly addicted to the
                  storyline!
                </p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(23 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 8 (Excellent)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/12/2024</div>
              </div>
              <div className="content">
                <h2 id="title">A Visual Delight!</h2>
                <p id="text">
                  Incredible animation quality in Sousou no Friren. Kudos to the
                  animators!
                </p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(34 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 9 (Outstanding)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/13/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Captivating Storyline!</h2>
                <p id="text">
                  Sousou no Friren had me gripped from the first episode. Can't
                  wait for more!
                </p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(45 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 10 (Masterpiece)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/14/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Anime of the Year!</h2>
                <p id="text">
                  Sousou no Friren deserves all the praise. Truly a masterpiece!
                </p>
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
          <div className="reviews-comment">
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
                <div className="user-reviews">(67 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 9 (Outstanding)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/15/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Excellent Character Development!</h2>
                <p id="text">
                  Sousou no Friren keeps getting better with each episode.
                  Fantastic character arcs!
                </p>
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
          <div className="reviews-comment">
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
                    <p>GamingGeek24</p>
                  </a>
                </div>
                <div className="user-reviews">(29 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 8 (Excellent)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/16/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Fire OST!</h2>
                <p id="text">
                  Sousou no Friren's OST is on another level. Absolutely love
                  the music!
                </p>
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
          <div className="reviews-comment">
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
                    <p>FilmBuff77</p>
                  </a>
                </div>
                <div className="user-reviews">(38 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 9 (Outstanding)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/17/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Meticulously Crafted Scenes!</h2>
                <p id="text">
                  Every scene in Sousou no Friren feels like a visual
                  masterpiece. Brilliantly crafted!
                </p>
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
          <div className="reviews-comment">
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
                    <p>AdventureSeeker45</p>
                  </a>
                </div>
                <div className="user-reviews">(51 reviews)</div>
                <div className="spacement">|</div>
                <div className="rating">Rated 10 (Masterpiece)</div>
                <div className="spacement">|</div>
                <div className="review-date">01/18/2024</div>
              </div>
              <div className="content">
                <h2 id="title">Edge of My Seat!</h2>
                <p id="text">
                  Sousou no Friren has me on the edge of my seat. More, please!
                </p>
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
