import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import "./NavBar.scss";
import slackLogoWhite from "../../assets/images/slack_logo_white.svg";
import slackLogoBlack from "../../assets/images/slack_logo_black.svg";
import slackLogoSolo from "../../assets/images/solo-logo.svg";

const NavBar = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <button onClick={() => dispatch(sessionActions.logoutUser(sessionUser))}>
        Sign Out
      </button>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink
          to={"/signin/signin"}
          style={{ textDecoration: "none", color: "#fff" }}
          className="sign-btn left"
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
          className="sign-btn right"
        >
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="nav-bar-container" ref={ref}>
      <nav className="nav-bar">
        <NavLink to="/" className="home-logo-cont">
          <img src={slackLogoSolo} alt="logo" style={{ height: 25 }} />
          <h3>slick</h3>
        </NavLink>
        <section className="sign-buttons">{sessionLinks}</section>
      </nav>
    </div>
  );
});

export default NavBar;
