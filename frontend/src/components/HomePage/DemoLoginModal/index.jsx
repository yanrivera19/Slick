import { useState } from "react";
import CrossIcon from "../../Svgs&Icons/CrossIcon";

const DemoLoginModal = ({ handleDemoLogin, handleOpenDemoModal }) => {
  return (
    <div id="demo-modal">
      <div className="demo-modal-header-container">
        <h1 className="modal-header">Experience Slick!</h1>
        <button onClick={handleOpenDemoModal} className="cross-btn demo">
          <CrossIcon size={22} />
        </button>
      </div>
      <div className="demo-steps-cont">
        <p className="demo-intro">
          To get the full Slick experience, one needs to be logged in to
          different user accounts that share a workspace at the same time. To do
          so, follow these steps:
        </p>
        <ol className="demo-steps">
          <li>
            Open a new incognito window, copy and paste the following url, and
            navigate to it:
            <a href="https://slick-x3v8.onrender.com">
              {" "}
              https://slick-x3v8.onrender.com
            </a>
          </li>
          <li>
            Click on the <span>Demo Login</span> button at the top-right corner
            of the page and then click the <span>Demo User 2</span> button at
            the bottom of the modal
          </li>
          <li>
            Click the <span>Launch Slick</span> button of the{" "}
            <span>Fight Club</span> workspace
          </li>
          <li>Open your other non-incognito window</li>
          <li>
            Click the <span>Demo User 1</span> button
          </li>
          <li>Repeat step #3</li>
          <li>
            Create a live interaction between both user accounts by sending
            messages to each other
          </li>
        </ol>
        <p id="demo-note">Note:</p>
        <p>
          Only <span>Demo User 1</span> can create, edit, and delete channels,
          since it is the owner of the <span>Fight Club</span> workspace.
        </p>
      </div>
      <div className="demo-login-btns">
        <button
          style={{ textDecoration: "none", color: "#fff" }}
          className="sign-btn right scroll"
          id="demo-left-btn"
          onClick={(e) => handleDemoLogin(e, "demo-user@gmail.com")}
        >
          Demo User 1
        </button>
        <button
          style={{ textDecoration: "none", color: "#fff" }}
          className="sign-btn right scroll"
          onClick={(e) => handleDemoLogin(e, "demo-user2@gmail.com")}
        >
          Demo User 2
        </button>
      </div>
    </div>
  );
};

export default DemoLoginModal;
