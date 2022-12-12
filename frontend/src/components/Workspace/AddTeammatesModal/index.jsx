import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchUsers } from "../../../store/user";
import { useParams } from "react-router-dom";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import { useEffect } from "react";
import SelectedNewMembers from "../../CreateWorkspacePage/CreateWorkspaceAddTeammates/SelectedNewMembers";

const AddTeammatesModal = ({
  handleOpenAddTeamModal,
  handleAddUsers,
  workspaceUsers,
}) => {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const users = useSelector((state) => Object.values(state.users));
  const sessionUser = useSelector((state) => state.session.user);
  let resultsCount = 0;

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

  return (
    <div id="add-teammates-modal">
      <div className="create-modal-header">
        <h1 id="create-header">Add teammates</h1>
        <button onClick={handleOpenAddTeamModal} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="add-teammate-info">
        <p id="add-teammate-text">Add other users to your workspace!</p>

        <section className="new-teammate-search-container">
          <div className="new-teammate-search">
            <input
              className="search-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for somebody"
            />
          </div>
        </section>
        {inputValue.length > 0 && (
          <div className="search-cont users teammates">
            <div
              className={
                resultsCount > 0 ? "users-results-cont users" : "results-hidden"
              }
            >
              {Object.values(users).map((user) => {
                if (
                  inputValue.length > 0 &&
                  workspaceUsers[user.id] === undefined &&
                  user.username !== sessionUser.username &&
                  (user.username.toLowerCase().includes(inputValue) ||
                    user.email.toLowerCase().includes(inputValue))
                ) {
                  resultsCount++;
                  return (
                    <SelectedNewMembers
                      key={user.id}
                      user={user}
                      handleResultClick={handleResultClick}
                    />
                  );
                } else {
                  resultsCount--;
                }
              })}
            </div>
          </div>
        )}
      </div>
      <button
        className={`create-channel-btn ${
          selectedUsers.length > 0 ? "ready" : ""
        }`}
        onClick={(e) => handleAddUsers(e, selectedUsers)}
      >
        Add
      </button>
    </div>
  );
};

export default AddTeammatesModal;
