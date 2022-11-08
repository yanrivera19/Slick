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

const SideBar = ({
  workspace,
  handleNewMessageClick,
  channels,
  dms,
  sessionUser,
  handleChannelClick,
  dmUsersNames,
}) => {
  const [hideDms, setHideDms] = useState(false);
  const [hideChannels, setHideChannels] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

  const handleAddChannel = () => {
    setShowCreateChannelModal(!showCreateChannelModal);
  };

  return (
    <>
      <section
        className={showCreateChannelModal ? "delete-modal-container" : "hide"}
      >
        <CreateChannelModal handleAddChannel={handleAddChannel} />
      </section>
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
          <section id="extras-section">
            <div>
              <span>Direct messages</span>
              <span></span>
            </div>
          </section>
          <section id="channel-section">
            <div className="channel-item-header">
              <span
                className="square-btn-sidebar"
                onClick={() => setHideChannels(!hideChannels)}
              >
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
                    onClick={(e) => handleChannelClick(e, channel, "channel")}
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
            <div className="channel-item-header" onClick={handleAddChannel}>
              <span className="square-btn-sidebar plus">
                <FaPlus size={10} />
              </span>
              <span>Add channels</span>
            </div>
          </section>
          <section id="dm-section">
            <div className="dm-item-header">
              <span
                className="square-btn-sidebar"
                onClick={() => setHideDms(!hideDms)}
              >
                {hideDms ? (
                  <BsFillCaretDownFill size={12} />
                ) : (
                  <BsFillCaretDownFill size={12} />
                )}
              </span>
              <span>Direct messages</span>
            </div>
            <div className={hideDms ? "hide" : ""}>
              {dms.map((directMessage, idx) => {
                // if (sessionUser.directMessages[directMessage.id]) {
                const members = directMessage.users;
                const names = dmUsersNames(members);
                // debugger;
                return (
                  <div
                    key={directMessage.id}
                    onClick={(e) => handleChannelClick(e, directMessage, "dm")}
                  >
                    {/* // return ( */}
                    <div className="dm-item" key={directMessage.id}>
                      <span></span>
                      <span className="dm-users">{names}</span>
                    </div>
                    {/* // ); */}
                  </div>
                );
                // } else {
                //   return null;
                // }
              })}
            </div>
            <div className="dm-item-header">
              <span className="square-btn-sidebar plus">
                <FaPlus size={10} />
              </span>
              <span>Add teammates</span>
            </div>
          </section>
        </div>
        <section id="sidebar-footer">
          <p>{sessionUser.username}</p>
        </section>
      </aside>
    </>
  );
};

export default SideBar;
