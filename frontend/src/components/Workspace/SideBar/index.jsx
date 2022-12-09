import { useState } from "react";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import WriteIcon from "../../Svgs&Icons/WriteMsgIcon";
import HashTagIcon from "../../Svgs&Icons/HashTagIcon";
import CreateChannelModal from "../CreateChannelModal";
import AddTeammatesModal from "../AddTeammatesModal";
import userImg4 from "../../../assets/images/default-user-img4.png";
import { updateWorkspace } from "../../../store/workspaces";
import { useDispatch } from "react-redux";

const SideBar = ({
  workspace,
  handleNewMessageClick,
  channels,
  dms,
  sessionUser,
  handleChannelClick,
  dmUsersNames,
  closeAddChannelModal,
  setNewChannel,
  newChannel,
}) => {
  const [hideDms, setHideDms] = useState(false);
  const [hideChannels, setHideChannels] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showAddTeammateModal, setShowAddTeammateModal] = useState(false);
  const [clickedChatRoom, setClickedChatRoom] = useState(null);
  const dispatch = useDispatch();

  const handleAddChannelModal = () => {
    if (workspace.ownerId === sessionUser.id) {
      setShowCreateChannelModal(!showCreateChannelModal);
      // setNewChannel(!newChannel);
      closeAddChannelModal();
    }
  };

  const handleOpenAddTeamModal = () => {
    // if (workspace.ownerId === sessionUser.id) {
    setShowAddTeammateModal(!showAddTeammateModal);
    // }
  };

  const handleAddUsers = (e, selectedUsers) => {
    dispatch(
      updateWorkspace(
        {
          ...workspace,
        },
        selectedUsers
      )
    ).then(() => setShowAddTeammateModal(!showAddTeammateModal));
  };

  const handleRoomClick = (e, room, roomType) => {
    if (roomType === "Channel") {
      setClickedChatRoom(room.name);
    } else {
      setClickedChatRoom(dmUsersNames(room.users));
    }
    handleChannelClick(e, room, roomType);
  };

  return (
    <>
      <section
        className={
          showCreateChannelModal ? "create-channel-modal-container" : "hide"
        }
      >
        <CreateChannelModal handleAddChannelModal={handleAddChannelModal} />
      </section>
      {showAddTeammateModal && (
        <section
          className="add-teammates-modal-container"
          // showAddTeammateModal ? "add-teammates-modal-container" : "hide"
        >
          <AddTeammatesModal
            handleOpenAddTeamModal={handleOpenAddTeamModal}
            handleAddUsers={handleAddUsers}
            workspaceUsers={workspace.users}
          />
        </section>
      )}
      <aside className="app-side-bar">
        <div>
          <header className="workspace-header">
            <div className="workspace-header-cont">
              <div>
                <span id="works-name">{workspace.name}</span>
                <span></span>
              </div>
              <button className="write-btn" onClick={handleNewMessageClick}>
                <WriteIcon />
              </button>
            </div>
          </header>
          <section id="extras-section"></section>
          <section id="channel-section">
            <div
              className="channel-item-header"
              onClick={() => setHideChannels(!hideChannels)}
            >
              <span className="square-btn-sidebar">
                {hideChannels ? (
                  <BsCaretRightFill size={12} />
                ) : (
                  <BsFillCaretDownFill size={12} />
                )}
              </span>
              <span>Channels</span>
            </div>
            <div className={hideChannels ? "hide" : ""}>
              {channels.map((channel) => {
                return (
                  <div
                    className="channel-item"
                    onClick={(e) => handleRoomClick(e, channel, "Channel")}
                    key={channel.id}
                  >
                    <span style={{ marginRight: "11px", paddingTop: "4px" }}>
                      <HashTagIcon />
                    </span>
                    <span>{channel.name}</span>
                  </div>
                );
              })}
            </div>
            <div
              className="channel-item-header"
              onClick={handleAddChannelModal}
            >
              <span className="square-btn-sidebar plus">
                <FaPlus size={10} />
              </span>
              <span>Add channels</span>
            </div>
          </section>
          <section id="dm-section">
            <div
              className="dm-item-header"
              onClick={() => setHideDms(!hideDms)}
            >
              <span className="square-btn-sidebar">
                {hideDms ? (
                  <BsCaretRightFill size={12} />
                ) : (
                  <BsFillCaretDownFill size={12} />
                )}
              </span>
              <span>Direct messages</span>
            </div>
            <div className={hideDms ? "hide" : ""}>
              {dms.map((directMessage, idx) => {
                const members = directMessage.users;
                const names = dmUsersNames(members);

                return (
                  <div
                    key={directMessage.id}
                    onClick={(e) =>
                      handleRoomClick(e, directMessage, "DirectMessage")
                    }
                  >
                    <div className="dm-item side-bar" key={directMessage.id}>
                      <img
                        className="user-img-default"
                        height={21}
                        width={21}
                        src={userImg4}
                        alt="user-img"
                      />
                      <span className="dm-users side-bar">{names}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="dm-item-header" onClick={handleOpenAddTeamModal}>
              <span className="square-btn-sidebar plus">
                <FaPlus size={10} />
              </span>
              <span>Add teammates</span>
            </div>
          </section>
        </div>
        <section className="sidebar-footer">
          <p>{clickedChatRoom}</p>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
