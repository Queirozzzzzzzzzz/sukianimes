export default function Playlist() {
  return (
    <div class="list playlist">
      <h1 id="title">Cool playlist</h1>
      <div class="lists">
        <a href="/watchlater" id="watchlater">
          WATCHLATER
        </a>
        <a href="/playlists" id="playlists">
          PLAYLISTS
        </a>
        <a href="/history" id="history">
          HISTORY
        </a>
      </div>
      <div class="series-container">
        <div class="content-item">
          <a href="">
            <div class="banner">
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcset="/img/previews/watchlater-preview-mobile-1.webp"
                />
                <source
                  media="(min-width: 601px)"
                  srcset="/img/previews/watchlater-preview-1.webp"
                />
                <img
                  id="banner"
                  src="/img/previews/watchlater-preview-1.webp"
                />
              </picture>
              <img id="age-rating" src="/svg/A12.svg" />
              <img src="/svg/play.svg" id="play-img" />
            </div>
          </a>
          <div class="info">
            <div class="top">
              <a href="">
                <h4>Sound Euphonium!</h4>
              </a>
              <h5>Up Next: S2 E1</h5>
            </div>
            <div class="bottom">
              <div class="left">
                <h5>Series</h5>
                <p>Sub | Dub</p>
              </div>
              <div class="right">
                <button>
                  <img id="trash" src="/svg/trash.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <a href="">
            <div class="banner">
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcset="/img/previews/watchlater-preview-mobile-3.webp"
                />
                <source
                  media="(min-width: 601px)"
                  srcset="/img/previews/watchlater-preview-3.webp"
                />
                <img
                  id="banner"
                  src="/img/previews/watchlater-preview-3.webp"
                />
              </picture>
              <img id="age-rating" src="/svg/A10.svg" />
              <img src="/svg/play.svg" id="play-img" />
            </div>
          </a>
          <div class="info">
            <div class="top">
              <a href="">
                <h4>Your lie in April</h4>
              </a>
              <h5>Start Watching: S1 E1</h5>
            </div>
            <div class="bottom">
              <div class="left">
                <h5>Series</h5>
                <p>Sub | Dub</p>
              </div>
              <div class="right">
                <button>
                  <img id="trash" src="/svg/trash.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <a href="/series/sousou-no-frieren/watch/1/6">
            <div class="banner">
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcset="/img/previews/watchlater-preview-mobile-7.webp"
                />
                <source
                  media="(min-width: 601px)"
                  srcset="/img/previews/watchlater-preview-7.webp"
                />
                <img
                  id="banner"
                  src="/img/previews/watchlater-preview-7.webp"
                />
              </picture>
              <img id="age-rating" src="/svg/A12.svg" />
              <img src="/svg/play.svg" id="play-img" />
            </div>
          </a>
          <div class="info">
            <div class="top">
              <a href="/series/sousou-no-frieren/1">
                <h4>Frieren: Beyond Journey's End</h4>
              </a>
              <h5>Continue: S1 E6</h5>
            </div>
            <div class="bottom">
              <div class="left">
                <h5>Series</h5>
                <p>Sub | Dub</p>
              </div>
              <div class="right">
                <button>
                  <img id="trash" src="/svg/trash.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
