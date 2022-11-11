import { NavLink, Redirect, useParams } from "react-router-dom";
import NavBarWelcome from "./NavBarWelcome";
import { useDispatch, useSelector } from "react-redux";
import wavingHandImg from "../../assets/images/waving-hand.gif";
import womanLaptop from "../../assets/images/woman-with-laptop-color-background.png";
import { useEffect } from "react";
import { getUser } from "../../store/user";
import { fetchWorkspaces } from "../../store/workspaces";
import { fetchUser } from "../../store/user";
import workspaceImg from "../../assets/images/workspace-img1.png";

const WelcomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const workspaces = useSelector((state) => Object.values(state.workspaces));

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [clientId]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="welcome-container">
      <div className="nav-cont">
        <NavBarWelcome />
      </div>
      <div className="welcome-content">
        <header>
          <img src={wavingHandImg} alt="waving-hand" />
          <h1>Welcome</h1>
        </header>
        <section className="workspaces">
          <div className="workspaces-user">
            Workspaces for {sessionUser.email}
          </div>

          {workspaces &&
            workspaces.map((workspace) => (
              <div className="workspace-launch" key={workspace.id}>
                <div className="workspace-details">
                  <img
                    src={workspaceImg}
                    alt="workspace-img"
                    className="workspace-img"
                  />
                  <div>
                    <p className="workspace-name">{workspace.name}</p>
                    <p className="workspace-members-count">{`${
                      workspace.members
                    } member${workspace.members > 1 ? "s" : ""}`}</p>
                  </div>
                </div>
                <div>
                  <NavLink
                    to={`/client/${sessionUser.id}/${workspace.id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                    className="launch-slick-btn"
                  >
                    LAUNCH SLICK
                  </NavLink>
                </div>
              </div>
            ))}
        </section>
        <div className="different-team">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={womanLaptop} alt="woman-laptop" />
            <strong>Want to use Slick with a different team?</strong>
          </div>
          <div className="teamtext-and-btn">
            <NavLink
              to={`/client/${sessionUser.id}/setup-team`}
              style={{ textDecoration: "none", color: "#fff" }}
              className="new-workspace-welcome"
            >
              CREATE A NEW WORKSPACE
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
