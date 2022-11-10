import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../../Workspace/SideBar";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import { fetchUsers } from "../../../store/user";
import SelectedNewMembers from "./SelectedNewMembers";

const CreateWorkspaceAddTeammates = () => {
  const [inputValue, setInputValue] = useState("");
  const users = useSelector((state) => Object.values(state.users));
  const sessionUser = useSelector((state) => state.session.user);
  const name = useLocation();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    dispatch(fetchUsers());
  }, []);

  const removeUserFromNewMsg = (e, user) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  const handleResultClick = (e, user) => {
    setSelectedUsers([...selectedUsers, user]);
  };

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
            <p>Step 2 of 3</p>
          </div>
          <h2 className="setup-main-head">
            Who else is on the {name.state.name} team?
          </h2>
          <p className="setup-info">Add teammate by email</p>
          <div className="">
            <section className="new-msg-search-container">
              {/* <div ref={lastMessageRef}></div> */}
              <div className="new-msg-search">
                {/* <div style={{ display: "flex", alignItems: "center" }}>
                  {selectedUsers.map((selectedUser) => (
                    <div className="selected-user">
                      <span style={{ marginRight: "8px" }}>
                        {selectedUser.username}
                      </span>
                      <button
                        onClick={(e) => removeUserFromNewMsg(e, selectedUser)}
                        className="remove-selected-btn"
                      >
                        <CrossIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div> */}
                <input
                  disabled={selectedUsers.length === 4}
                  className="search-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search for somebody"
                />
              </div>
            </section>
            <div className="search-cont">
              <div className="users-results-cont">
                {/* {filteredData.map((obj) => { */}
                {users.map((user) => {
                  // console.log(selectedUsers);
                  if (
                    user.username !== sessionUser.username &&
                    !selectedUsers
                      .map((selUser) => selUser.username)
                      .includes(user.username)
                  ) {
                    return (
                      <div onClick={(e) => handleResultClick(e, user)}>
                        <SelectedNewMembers key={user.id} user={user} />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="setup-next-btn-cont">
              {/* <NavLink to={inputValue.trim().length < 1 ? ``}> */}
              <button
                disabled={inputValue.trim().length < 1}
                className={`setup-next-btn ${
                  inputValue.trim().length > 0 ? "ready" : ""
                }`}
              >
                Next
              </button>
              {/* </NavLink> */}
            </div>
            {/* <form onSubmit={onSubmit}>
              <input
                placeholder="Ex: Acme Marketing or Acme Co"
                className="setup-input-field"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="setup-next-btn-cont"> */}
            {/* <NavLink to={inputValue.trim().length < 1 ? ``}> */}
            {/* <button
                  disabled={inputValue.trim().length < 1}
                  className={`setup-next-btn ${
                    inputValue.trim().length > 0 ? "ready" : ""
                  }`}
                >
                  Next
                </button> */}
            {/* </NavLink> */}
            {/* </div> */}
            {/* </form> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateWorkspaceAddTeammates;
