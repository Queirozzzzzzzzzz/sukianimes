import { useRouter } from "next/router";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { section } = router.query;

  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let pageTitle = "";

  switch (section) {
    case "profile":
      pageTitle = "Profile";
      break;
    case "subscription":
      pageTitle = "Subscription";
      break;
    case "preferences":
      pageTitle = "Preferences";
      break;
    case "change-email":
      pageTitle = "Change Email";
      break;
    case "change-password":
      pageTitle = "Change Password";
      break;
    case "order-history":
      pageTitle = "Order History";
      break;
    case "payment-methods":
      pageTitle = "Payment Methods";
      break;
  }

  const items = [
    "profile",
    "subscription",
    "preferences",
    "change-email",
    "change-password",
    "order-history",
    "payment-methods",
  ];

  return (
    <>
      <div className="account">
        <div className="top">
          <div className="left">
            <div className="icon">
              <img src="/svg/configuration.svg" />
            </div>
          </div>
          <div className="right">
            <div className="section-title">
              <h1>{pageTitle}</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="left">
            <ul>
              {items.map((item) => (
                <li key={item}>
                  <a href={`/account/${item}`}>
                    <div className={section === item ? "active" : ""}>
                      {item
                        .split("-")
                        .map(
                          (part) =>
                            part.charAt(0).toUpperCase() + part.slice(1),
                        )
                        .join(" ")}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            {section === "profile" && (
              <div className="container">
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <img src="/img/previews/series-reviews-logo-1.webp" />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <h2 id="username">My Username</h2>
                <p id="email">
                  <strong>Email:</strong> myemail@email.com
                </p>
                <p id="phone-number">
                  <strong>Phone number:</strong> +00 (00) 00000-0000
                </p>
              </div>
            )}
            {section === "subscription" && (
              <div className="container">
                <img src="/svg/level-0-member.svg" alt="Subscription Icon" />
                <h2 id="subscription">Free</h2>
                <p id="remaining-time">
                  You currently don't have a subscription
                </p>
                <a href="/offer-upgrade" id="offer-upgrade">
                  Upgrade subscription
                </a>
              </div>
            )}

            {section === "preferences" && (
              <div className="container">
                <form action="" method="post">
                  <h2 id="language-title">Language</h2>
                  <select name="language" id="language">
                    <option value="en">English</option>
                    <option value="pt-br">Português (Brasil)</option>
                  </select>
                  <h2 id="subtitles-title">Subtitles</h2>
                  <select name="subtitles" id="subtitles">
                    <option value="en">English</option>
                    <option value="pt-br">Português (Brasil)</option>
                  </select>
                  <h2 id="captions-title">Captions</h2>
                  <p>(Enable subtitles by default)</p>
                  <input
                    type="checkbox"
                    name="show-captions"
                    id="show-captions"
                  />
                  <h2 id="age-restriction-title">Age Restriction</h2>
                  <select name="age-restriction" id="age-restriction">
                    <option value="0">AL</option>
                    <option value="1">A10</option>
                    <option value="2">A12</option>
                    <option value="3">A14</option>
                    <option value="4">A16</option>
                    <option value="5" defaultValue>
                      A18
                    </option>
                  </select>
                  <button type="submit">Save</button>
                </form>
              </div>
            )}
            {section === "change-email" && (
              <div className="container">
                <form action="" method="post">
                  <h2 id="current-email-title">Current Email</h2>
                  <p>myemail@email.com</p>
                  <h2 id="new-email-title">New Email</h2>
                  <input type="email" name="new-email" id="new-email" />
                  <h2 id="confirm-new-email-title">Confirm New Email</h2>
                  <input
                    type="email"
                    name="confirm-new-email"
                    id="confirm-new-email"
                  />
                  <h2 id="password-title">Password</h2>
                  <input type="password" name="password" id="password" />
                  <button type="submit">Change Email</button>
                </form>
              </div>
            )}
            {section === "change-password" && (
              <div className="container">
                <form action="" method="post">
                  <h2 id="curent-password-title">Current Password</h2>
                  <input
                    type="password"
                    name="current-password"
                    id="current-password"
                  />
                  <h2 id="new-password-title">New Password</h2>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                  />
                  <h2 id="confirm-new-password-title">Confirm New Password</h2>
                  <input
                    type="password"
                    name="confirm-new-password"
                    id="confirm-new-password"
                  />
                  <button type="submit">Change Password</button>
                </form>
              </div>
            )}
            {section === "order-history" && (
              <div className="container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Payment Info</th>
                      <th>Amount</th>
                      <th>Subscription</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2023-01-21</td>
                      <td>Visa ending in 0000</td>
                      <td>14.99</td>
                      <td>Basic</td>
                      <td>successful</td>
                    </tr>
                    <tr>
                      <td>2023-01-19</td>
                      <td>Visa ending in 0000</td>
                      <td>14.99</td>
                      <td>Basic</td>
                      <td>failed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {section === "payment-methods" && (
              <div className="container">
                <h2 id="credit-cards-title">Credit Cards</h2>
                <ul className="credit-cards-list">
                  <li id="credit-card-1">
                    <h3>Visa ending in 0000</h3>
                    <a href="/secure/credit-card/remove/1">Remove</a>
                  </li>
                  <li id="credit-card-2">
                    <h3>Visa ending in 1111</h3>
                    <a href="/secure/credit-card/remove/2">Remove</a>
                  </li>
                </ul>
                <a href="/secure/credit-card">New Credit Card</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
