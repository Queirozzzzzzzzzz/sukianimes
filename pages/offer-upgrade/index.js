export default function OfferUpgrade() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="offer-upgrade">
      <div className="banner">
        <h1>Enjoy.</h1>
        <button onClick={scrollToBottom}>Unlock Premium</button>
      </div>
      <div className="offer-upgrade products-container">
        <div className="product">
          <img src="/svg/level-1-member.svg" />
          <h3>Basic</h3>
          <h1>$ 00.00/month</h1>
          <button>Free Trial</button>
          <a href="">Skip free trial</a>
          <ul>
            <li>
              <img src="/svg/correct.svg" />
              <p>Access to the complete collection</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Episodes one hour after release</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Limit of 1 simultaneous device</p>
            </li>
            <li>
              <img src="/svg/blocked.svg" />
              <p>Offline viewing</p>
            </li>
            <li>
              <img src="/svg/blocked.svg" />
              <p>Music library</p>
            </li>
            <li>
              <img src="/svg/blocked.svg" />
              <p>24% discount on the monthly fee</p>
            </li>
          </ul>
        </div>
        <div className="product">
          <img src="/svg/level-2-member.svg" />
          <h3>Advanced</h3>
          <h1>$ 00.00/month</h1>
          <button>Free Trial</button>
          <a href="">Skip free trial</a>
          <ul>
            <li>
              <img src="/svg/correct.svg" />
              <p>Access to the complete collection</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Episodes one hour after release</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Limit of 1 simultaneous device</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Offline viewing</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Music library</p>
            </li>
            <li>
              <img src="/svg/blocked.svg" />
              <p>24% discount on the monthly fee</p>
            </li>
          </ul>
        </div>

        <div className="product">
          <img src="/svg/level-3-member.svg" />
          <h3>Enthusiast</h3>
          <h1>$ 00.00/month</h1>
          <button>Free Trial</button>
          <a href="">Skip free trial</a>
          <ul>
            <li>
              <img src="/svg/correct.svg" />
              <p>Access to the complete collection</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Episodes one hour after release</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Limit of 1 simultaneous device</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Offline viewing</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>Music library</p>
            </li>
            <li>
              <img src="/svg/correct.svg" />
              <p>24% discount on the monthly fee</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
