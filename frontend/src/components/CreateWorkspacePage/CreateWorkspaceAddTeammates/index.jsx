import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../../Workspace/SideBar";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import { fetchUsers } from "../../../store/user";
import SelectedNewMembers from "./SelectedNewMembers";

const CreateWorkspaceAddTeammates = ({
  name,
  handleNextStep,
  sessionUser,
  saveSelectedUsers,
}) => {
  const [inputValue, setInputValue] = useState("");
  const users = useSelector((state) => Object.values(state.users));
  const [selectedUsers, setSelectedUsers] = useState([sessionUser]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleResultClick = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleAddMembers = () => {
    saveSelectedUsers(selectedUsers);
    handleNextStep();
  };

  return (
    <>
      <div className="setup-page-step-head">
        <p>Step 2 of 3</p>
      </div>
      <h2 className="setup-main-head">Who else is on the {name} team?</h2>
      <p className="setup-info">Find teammates</p>
      <div className="">
        <div className="search-cont users">
          <div className="users-results-cont users">
            {users.map((user) => {
              if (user.username !== sessionUser.username) {
                return (
                  <div className="search-user-cont" style={{ width: "100%" }}>
                    <SelectedNewMembers
                      key={user.id}
                      user={user}
                      handleResultClick={handleResultClick}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="setup-next-btn-cont">
          {/* <NavLink to={inputValue.trim().length < 1 ? ``}> */}
          <button
            disabled={selectedUsers.length < 0}
            className={`setup-next-btn ${
              selectedUsers.length > 0 ? "ready" : ""
            }`}
            onClick={handleAddMembers}
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
      {/* </section> */}
    </>
  );
};

export default CreateWorkspaceAddTeammates;
