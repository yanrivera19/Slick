import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../Workspace/SideBar";
import { fetchUsers } from "../../store/user";

const CreateWorkspacePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");

  return (
    <div className="setup-page-main-cont">
      <nav className="app-nav">
        <div className="nav-right-side"></div>
        <div className="app-search-cont">
          {/* <button className="app-search-bar"></button> */}
          {/* <button></button> */}
        </div>
        <div className="nav-left-side"></div>
      </nav>
      <div className="app-main-cont">
        <aside className="app-side-bar">
          <div>
            <header className="workspace-header setup">
              <div className="workspace-header-cont setup">
                <button className=" setup-clear-btn"></button>
              </div>
            </header>
          </div>
        </aside>
        <section className="setup-page-content">
          <div className="setup-page-step-head">
            <p>Step 1 of 3</p>
          </div>
          <h2 className="setup-main-head">
            What's the name of your company or team?
          </h2>
          <p className="setup-info">
            This will be the name of your Slack workspace — choose something
            that your team will recognize.
          </p>
          <div className="">
            <form>
              <input
                placeholder="Ex: Acme Marketing or Acme Co"
                className="setup-input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="setup-next-btn-cont">
                <NavLink
                  to={{
                    pathname:
                      name.trim().length > 1
                        ? `/client/${sessionUser.id}/setup-add-teammates`
                        : null,
                    state: { name: name },
                  }}
                >
                  <button
                    disabled={name.trim().length < 1}
                    className={`setup-next-btn ${
                      name.trim().length > 0 ? "ready" : ""
                    }`}
                  >
                    Next
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateWorkspacePage;
