export default function Playlists() {
  return (
    <div class="list playlists">
      <h1 id="title">PLAYLISTS</h1>
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
      <div class="playlists-container">
        <div class="content-item">
          <a href="/playlist/cool-playlist" class="left">
            <h2 id="playlist-name">Cool playlist</h2>
            <h5 id="playlist-info">3 Items | Updated on Mar 6, 2023</h5>
          </a>
          <div class="right">
            <a href="" id="edit">
              <img src="/svg/edit.svg" />
            </a>
            <a href="" id="trash">
              <img src="/svg/trash.svg" />
            </a>
          </div>
        </div>
        <div class="content-item">
          <a href="" class="left">
            <h2 id="playlist-name">Masterpieces</h2>
            <h5 id="playlist-info">12 Items | Updated on Dez 12, 2023</h5>
          </a>
          <div class="right">
            <a href="" id="edit">
              <img src="/svg/edit.svg" />
            </a>
            <a href="" id="trash">
              <img src="/svg/trash.svg" />
            </a>
          </div>
        </div>
        <div class="content-item">
          <a href="" class="left">
            <h2 id="playlist-name">Why does this even exist</h2>
            <h5 id="playlist-info">2 Items | Updated on Aug 3, 2023</h5>
          </a>
          <div class="right">
            <a href="" id="edit">
              <img src="/svg/edit.svg" />
            </a>
            <a href="" id="trash">
              <img src="/svg/trash.svg" />
            </a>
          </div>
        </div>
        <div class="content-item">
          <a href="" class="left">
            <h2 id="playlist-name">Maybe watch</h2>
            <h5 id="playlist-info">8 Items | Updated on Sep 6, 2023</h5>
          </a>
          <div class="right">
            <a href="" id="edit">
              <img src="/svg/edit.svg" />
            </a>
            <a href="" id="trash">
              <img src="/svg/trash.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
