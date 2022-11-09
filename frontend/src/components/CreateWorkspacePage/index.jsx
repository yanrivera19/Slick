import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../Workspace/SideBar";
import { fetchUsers } from "../../store/user";

const CreateWorkspacePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [inputValue, setInputValue] = useState("");

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

                {/* <div>
                  <span id="works-name">{workspace.name}</span>
                  <span></span>
                </div>
                <button className="write-btn" onClick={handleNewMessageClick}>
                  <WriteIcon />
                </button> */}
              </div>
            </header>
            {/* <section id="extras-section">
              <div>
                <span>Direct messages</span>
                <span></span>
              </div>
            </section> */}
            {/* <section id="channel-section">
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
                      onClick={(e) => handleChannelClick(e, channel, "Channel")}
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
            </section> */}
            {/* <section id="dm-section">
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
                        handleChannelClick(e, directMessage, "DirectMessage")
                      }
                    >
            
                      <div className="dm-item" key={directMessage.id}>
                        <span></span>
                        <span className="dm-users">{names}</span>
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
            </section> */}
          </div>
          {/* <section id="sidebar-footer">
            <p>{sessionUser.username}</p>
          </section> */}
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
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="setup-next-btn-cont">
                <button
                  disabled={inputValue.trim().length < 1}
                  className={`setup-next-btn ${
                    inputValue.trim().length > 0 ? "ready" : ""
                  }`}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateWorkspacePage;
