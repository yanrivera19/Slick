import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWorkspace } from "../../../../store/workspaces";
import { useParams } from "react-router-dom";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import HashTagIconBold from "../../../Svgs&Icons/HashTagIconBold";
import HashTagIcon from "../../../Svgs&Icons/HashTagIcon";
import CaretOutlineIcon from "../../../Svgs&Icons/CaretOutlineIcon";
import { useRef } from "react";
import EditChannelModal from "./EditChannelModal";

const ChannelInfoModal = ({ channel, handleChannelNameClick }) => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const workspace = useSelector((state) => Object.values(state.workspaces));
  const [openMembers, setOpenMembers] = useState(false);
  const [openEditChannel, setOpenEditChannel] = useState(false);
  const membersModalRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (membersModalRef.current && membersModalRef.current.contains(e.target)) {
      setOpenMembers(!openMembers);
    } else if (
      membersModalRef.current &&
      !membersModalRef.current.contains(e.target)
    ) {
      setOpenMembers(false);
    }
  };

  const handleOpenMembers = () => {
    setOpenMembers(!openMembers);
  };

  const handleEditChannelModal = () => {
    setOpenEditChannel(!openEditChannel);
  };

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
                <div
                  className="channel-members-container"
                  ref={membersModalRef}
                >
                  <div className="cross-btn-members">
                    <p className="label">Members</p>
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
            {sessionUser.id === channel.ownerId && (
              <div className="flex-end ">
                <p className="edit-btn" onClick={handleEditChannelModal}>
                  Edit
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <EditChannelModal
          channel={channel}
          handleEditChannelModal={handleEditChannelModal}
          handleChannelNameClick={handleChannelNameClick}
        />
      )}
    </div>
  );
};

export default ChannelInfoModal;
