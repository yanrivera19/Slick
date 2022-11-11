import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import slackLogoSolo from "../../../assets/images/solo-logo.svg";
import * as sessionActions from "../../../store/session";

const NavBarWelcome = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar-container">
      <nav className="nav-bar">
        <div className="home-logo-cont">
          <img src={slackLogoSolo} alt="logo" style={{ height: 25 }} />
          <h3>slick</h3>
        </div>
        <section className="sign-buttons">
          <button
            onClick={() => dispatch(sessionActions.logoutUser(sessionUser))}
            style={{ textDecoration: "none", color: "#fff" }}
            className="sign-btn left"
          >
            SIGN OUT
          </button>
          <NavLink
            to={`/client/${sessionUser.id}/setup-team`}
            style={{
              textDecoration: "none",
              color: "#fff",
              marginLeft: "1.25rem",
            }}
            className="sign-btn right"
          >
            CREATE A NEW WORKSPACE
          </NavLink>
        </section>
      </nav>
    </div>
  );
};

export default NavBarWelcome;
