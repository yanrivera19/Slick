import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, Redirect, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../Workspace/SideBar";
import { fetchUsers } from "../../store/user";
import { createWorkspace } from "../../store/workspaces";
import CreateWorkspaceAddTeammates from "./CreateWorkspaceAddTeammates";
import CreateWorkspaceAddDescription from "./CreateWorkspaceAddDescription";

const CreateWorkspacePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const createNewWorkspace = () => {
    dispatch(
      createWorkspace({
        name: name,
        owner_id: sessionUser.id,
        users: selectedUsers,
      })
    ).then((workspace) => {
      history.push(`/client/${sessionUser.id}/${workspace.id}`);
    });
  };

  const saveSelectedUsers = (usersSelected) => {
    setSelectedUsers(usersSelected);
  };

  return (
    <div className="setup-page-main-cont">
      <nav className="app-nav">
        <div className="nav-right-side"></div>
        <div className="app-search-cont"></div>
        <div className="nav-left-side"></div>
      </nav>
      <div className="app-main-cont">
        <aside className="app-side-bar">
          <div>
            <header className="workspace-header setup">
              <div className="workspace-header-cont setup">
                {!name ? (
                  <button className=" setup-clear-btn"></button>
                ) : (
                  <span className="work-name-side">{name}</span>
                )}
              </div>
            </header>
          </div>
        </aside>
        <section className="setup-page-content">
          {step === 1 ? (
            <>
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
                <input
                  placeholder="Ex: Acme Marketing or Acme Co"
                  className="setup-input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="setup-next-btn-cont">
                  <button
                    disabled={name.trim().length < 1}
                    className={`setup-next-btn ${
                      name.trim().length > 0 ? "ready" : ""
                    }`}
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : step === 2 ? (
            <CreateWorkspaceAddTeammates
              sessionUser={sessionUser}
              handleNextStep={handleNextStep}
              name={name}
              saveSelectedUsers={saveSelectedUsers}
            />
          ) : step === 3 ? (
            <CreateWorkspaceAddDescription
              createNewWorkspace={createNewWorkspace}
              sessionUser={sessionUser}
              handleNextStep={handleNextStep}
              name={name}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default CreateWorkspacePage;
