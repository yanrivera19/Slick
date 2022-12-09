import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import WriteIcon from "../../Svgs&Icons/WriteMsgIcon";
import CreateChannelModal from "../CreateChannelModal";
import AddTeammatesModal from "../AddTeammatesModal";
import { updateWorkspace } from "../../../store/workspaces";
import { useDispatch } from "react-redux";
import SidebarDmItem from "./SidebarDmItem";
import SidebarChannelItem from "./SidebarChannelItem";

const SideBar = ({
  workspace,
  handleNewMessageClick,
  channels,
  dms,
  sessionUser,
  handleChannelClick,
  dmUsersNames,
  closeAddChannelModal,
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
      closeAddChannelModal();
    }
  };

  const handleOpenAddTeamModal = () => {
    setShowAddTeammateModal(!showAddTeammateModal);
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
        <section className="add-teammates-modal-container">
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
                  <SidebarChannelItem
                    channel={channel}
                    handleRoomClick={handleRoomClick}
                    sessionUser={sessionUser}
                    selected={channel.name === clickedChatRoom}
                  />
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
                  <SidebarDmItem
                    directMessage={directMessage}
                    handleRoomClick={handleRoomClick}
                    names={names}
                    sessionUser={sessionUser}
                    selected={
                      dmUsersNames(directMessage.users) === clickedChatRoom
                    }
                  />
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
