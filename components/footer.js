import React from "react";

export default function Footer() {
  const openGitHub = () => {
    window.open(
      "https://github.com/Queirozzzzzzzzzz?tab=repositories",
      "_blank",
    );
  };

  return (
    <>
      <footer>
        <a onClick={openGitHub}>Queirozzzzzzzzzz</a>
      </footer>
    </>
  );
}
