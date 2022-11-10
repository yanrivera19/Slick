import { createChannel } from "../../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchUsers } from "../../../store/user";
import { useParams } from "react-router-dom";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import HashTagIcon from "../../Svgs&Icons/HashTagIcon";
import { useEffect } from "react";

const AddTeammatesModal = ({ handleOpenAddTeamModal, handleAddUsers }) => {
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { workspaceId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const users = useSelector((state) => Object.values(state.users));
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, []);

  const removeUserFromNewMsg = (e, user) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  const handleResultClick = (e, user) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  // console.log(selectedUsers);

  return (
    <div id="add-teammates-modal">
      <div className="create-modal-header">
        <h1 id="create-header">Add teammates</h1>
        <button onClick={handleOpenAddTeamModal} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="create-channel-info">
        <p id="info-create-channel">Add other users to your workspace!</p>

        <section className="new-msg-search-container">
          {/* <div ref={lastMessageRef}></div> */}
          <div className="new-msg-search">
            <div style={{ display: "flex", alignItems: "center" }}>
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
            </div>
            <input
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
                  <span
                    key={user.id}
                    onClick={(e) => handleResultClick(e, user)}
                    className="search-result-item"
                    // key={obj.id * 29}
                  >
                    {/* {filterUserfromUsers(obj.users)} */}
                    {user.username}
                  </span>
                );
              }
            })}
          </div>
        </div>
        {/* <div className="">
          <form onSubmit={createChannel}>
            <p className="label">Name</p>
            <input
              className="input-field name"
              placeholder="# e.g. plan-budget"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex">
              <p className="label">Description</p>
              <span className="clear-text">{"(optional)"}</span>
            </div>
            <input
              className="input-field"
              onChange={(e) => setName(e.target.value)}
            />
            <p id="about-text" className="clear-text">
              What's this channel about?
            </p>
          </form>
        </div> */}
      </div>
      {/* <div
        className={`create-channel-btn ${
          name.trim().length > 0 ? "ready" : ""
        }`}
      > */}
      <button
        className={`create-channel-btn ${
          selectedUsers.length > 0 ? "ready" : ""
        }`}
        onClick={handleAddUsers}
      >
        Add
      </button>
      {/* </div> */}
    </div>
  );
};

export default AddTeammatesModal;
