import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWorkspace } from "../../../../store/workspaces";
import { useParams } from "react-router-dom";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import HashTagIconBold from "../../../Svgs&Icons/HashTagIconBold";
import HashTagIcon from "../../../Svgs&Icons/HashTagIcon";
import CaretOutlineIcon from "../../../Svgs&Icons/CaretOutlineIcon";
import { updateChannel } from "../../../../store/channels";

const ChannelInfoModal = ({ channel, handleChannelNameClick }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);
  const [errors, setErrors] = useState([]);
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const workspace = useSelector((state) => Object.values(state.workspaces));
  const [openMembers, setOpenMembers] = useState(false);
  const [openEditChannel, setOpenEditChannel] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchWorkspace(workspaceId));
  // }, []);

  const createNewChannel = (e) => {
    e.preventDefault();

    // dispatch(
    //   createChannel({
    //     name: name,
    //     description: description,
    //     workspaceId: workspaceId,
    //     ownerId: sessionUser.id,
    //   })
    // );
    // setName("");
    // setDescription("");
    // handleAddChannelModal();
  };

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      updateChannel({
        ...channel,
        name: name,
        description: description,
      })
    );
    handleEditChannelModal();
    handleChannelNameClick(e);
  };

  const handleCloseModal = () => {
    setName("");
    setDescription("");
    // handleAddChannelModal();
  };

  const handleOpenMembers = () => {
    setOpenMembers(!openMembers);
  };

  const handleEditChannelModal = () => {
    setOpenEditChannel(!openEditChannel);
  };

  // console.log(users);
  // console.log(channel.users[channel.ownerId].username);
  // console.log(workspace[0].users[channel.ownerId]);

  return (
    <div id="channel-info-modal">
      {!openEditChannel ? (
        <>
          <div className="channel-info-header">
            <h1>
              <span className="hash-tag-chat-room">
                <HashTagIconBold />
              </span>
              {channel.name}
            </h1>
            <button onClick={handleChannelNameClick} className="cross-btn">
              <CrossIcon size={22} />
            </button>
          </div>

          <div id="channel-info">
            <div className="channel-details">
              <div>
                <p className="label">Channel name</p>

                <p>
                  <span
                    style={{
                      position: "relative",
                      top: "2.5px",
                      marginRight: "2px",
                    }}
                  >
                    <HashTagIcon />
                  </span>
                  {channel.name}
                </p>
              </div>
            </div>
            <div className="channel-details">
              <p className="label">Description</p>
              <p>{channel.description}</p>
            </div>
            <div className="channel-details">
              <p className="label">Created by</p>
              <p>{channel.users[channel.ownerId].username}</p>
            </div>
            <div className="channel-details">
              <p className="label members" onClick={handleOpenMembers}>
                Members
                <span>
                  <CaretOutlineIcon />
                </span>
              </p>

              {openMembers && (
                <div className="channel-members-container">
                  <div className="cross-btn-members">
                    <button
                      onClick={handleOpenMembers}
                      className="cross-btn members"
                    >
                      <CrossIcon size={18} />
                    </button>
                  </div>
                  {Object.values(channel.users).map((user) => (
                    <div className="member-cont" key={user.id}>
                      <p className="channel-member">{user.username}</p>
                      <p className="member-email">({user.email})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* {sessionUser.id === channel.ownerId && ( */}
            <div className="flex-end edit-btn" onClick={handleEditChannelModal}>
              <p>Edit</p>
            </div>
            {/* )} */}
          </div>
        </>
      ) : (
        <div className="edit-channel-form">
          <form onSubmit={createNewChannel}>
            <p className="label">Name</p>
            <input
              value={name}
              className="input-field name"
              placeholder="# e.g. plan-budget"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex">
              <p className="label">Description</p>
            </div>
            <input
              value={description}
              className="input-field"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div id="create-channel-btn-container">
              <button
                className="cancel-edit-btn"
                onClick={handleEditChannelModal}
              >
                Cancel
              </button>
              <button
                disabled={name.trim().length < 1}
                className={`create-channel-btn ${
                  name.trim().length > 0 ? "ready" : ""
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChannelInfoModal;
