import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

const ResponsiveMenu = ({
  sessionUser,
  handleOpenDemoModal,
  setShowResponsiveMenu,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="responsive-menu-modal">
      <div className="responsive-menu-links">
        <div
          className="hamburger-menu responsive"
          onClick={(e) => setShowResponsiveMenu(false)}
          style={{ color: "black" }}
        >
          <GiHamburgerMenu size={28} />
        </div>
        {/* <div className="user-links-container"> */}
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
        {sessionUser ? (
          <button
            onClick={() => dispatch(sessionActions.logoutUser(sessionUser))}
          >
            Sign Out
          </button>
        ) : (
          <>
            <p
              className="sign-btn right scroll responsive"
              onClick={handleOpenDemoModal}
              style={{ borderRadius: 0 }}
            >
              Demo Login
            </p>
            <NavLink to={"/signin/signin"} className="sign-btn right scroll">
              Sign In
            </NavLink>
            <NavLink
              to={"/get-started/createnew"}
              className="sign-btn right scroll"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
