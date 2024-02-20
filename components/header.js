export default function Header() {
  return (
    <>
      <header>
        <div className="logo-container float-left">
          <a href="/">
            <img src="/static/img/logo.webp" id="logo" />
            <img src="/static/img/logo-text.webp" id="logo-text" />
          </a>
        </div>
        <div className="navbar-container float-right">
          <img id="search-icon" src="/static/svg/search.svg" />
          <img id="navbar-icon" src="/static/svg/menu.svg" />
        </div>
      </header>
      <nav className="navbar-items">
        <ul>
          <li className="navbar-section">
            <a href="/account/profile" className="profile-picture">
              <img src="/static/img/logo.webp" />
              <p>My Username</p>
            </a>
            <a href="/offer-upgrade" className="navbar-item">
              <button>Upgrade</button>
            </a>
          </li>
          <li className="navbar-section">
            <a href="/auth/login" id="navbar-item">
              <img src="/static/svg/login.svg" />
              <p>Login</p>
            </a>
            <a href="/auth/register" id="navbar-item">
              <img src="/static/svg/register.svg" />
              <p>Sign up</p>
            </a>
          </li>
          <li className="navbar-section">
            <a href="/" id="navbar-item">
              <img src="/static/svg/home.svg" />
              <p>Home</p>
            </a>
            <a href="/watchlater" id="navbar-item">
              <img src="/static/svg/watchlater.svg" />
              <p>Watch Later</p>
            </a>
            <a href="/playlists" id="navbar-item">
              <img src="/static/svg/playlist.svg" />
              <p>Playlists</p>
            </a>
            <a href="/history" id="navbar-item">
              <img src="/static/svg/history.svg" />
              <p>History</p>
            </a>
          </li>
          <li className="navbar-section">
            <a href="/account/profile" id="navbar-item">
              <img src="/static/svg/configuration.svg" />
              <p>Account</p>
            </a>
          </li>
          <li className="navbar-section">
            <a href="/logout" id="navbar-item">
              <img src="/static/svg/logout.svg" />
              <p>Leave</p>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
