import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import slackLogoBlack from "../../assets/images/slack_logo_black.svg";
import slackLogoSolo from "../../assets/images/solo-logo.svg";
import { useState, useEffect, useRef } from "react";

const NavBarOnScroll = React.forwardRef(
  ({ onClick, handleOpenDemoModal }, ref) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    let sessionLinks;

    if (sessionUser) {
      sessionLinks = (
        <button
          onClick={() => dispatch(sessionActions.logoutUser(sessionUser))}
        >
          Sign Out
        </button>
      );
    } else {
      sessionLinks = (
        <>
          <button
            style={{ textDecoration: "none", color: "#fff" }}
            className="sign-btn right scroll"
            onClick={handleOpenDemoModal}
          >
            Demo Login
          </button>
          <NavLink
            to={"/signin/signin"}
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: "1.25rem",
            }}
            className="sign-btn left scroll"
          >
            Sign In
          </NavLink>
          <NavLink
            to={"/get-started/createnew"}
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: "1.25rem",
            }}
            className="sign-btn right scroll"
          >
            Sign Up
          </NavLink>
        </>
      );
    }

    return (
      <div className="nav-bar-container scroll" ref={ref}>
        <nav className="nav-bar scroll">
          <div
            onClick={onClick}
            style={{ cursor: "pointer" }}
            className="scroll-logo-cont"
          >
            <img src={slackLogoSolo} alt="logo" style={{ height: 25 }} />
            <h3>slick</h3>
          </div>
          <div className="nav-links-container">
            <div className="user-links-container scroll">
              <a
                href="https://github.com/yanrivera19/Slick"
                target="_blank"
                rel="noreferrer"
              >
                <span>GitHub-Repo</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ycrivera/"
                target="_blank"
                rel="noreferrer"
              >
                <span>LinkedIn</span>
              </a>
              <a
                href="https://yanrivera19.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Portfolio</span>
              </a>
            </div>
            <section className="sign-buttons scroll">{sessionLinks}</section>
          </div>
        </nav>
      </div>
    );
  }
);

export default NavBarOnScroll;
