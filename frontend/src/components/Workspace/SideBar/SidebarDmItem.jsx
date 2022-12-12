import { useState, useEffect } from "react";
import userImg4 from "../../../assets/images/default-user-img4.png";

const SidebarDmItem = ({
  directMessage,
  handleRoomClick,
  names,
  sessionUser,
  selected,
  shownConversation,
}) => {
  const dmUsers = Object.values(directMessage.users);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    let showBadgeTimeout = setTimeout(() => {
      setShowBadge(true);
    }, 1000);

    return () => {
      clearTimeout(showBadgeTimeout);
    };
  }, []);

  return (
    <div
      key={directMessage.id}
      onClick={(e) => handleRoomClick(e, directMessage, "DirectMessage")}
      className={`dm-item-container ${selected ? "selected " : ""}`}
    >
      <div
        className={
          selected ? "selected side-bar dm-item" : "dm-item hover side-bar"
        }
        key={directMessage.id}
      >
        {dmUsers.length > 2 && (
          <button
            className={
              selected ? "dm-users-count transparent-bg" : "dm-users-count"
            }
          >
            <p style={{ lineHeight: "1.4em" }}>{dmUsers.length - 1}</p>
          </button>
        )}

        <img
          className="user-img-default"
          height={dmUsers.length > 2 ? 14 : 21}
          width={dmUsers.length > 2 ? 14 : 21}
          src={userImg4}
          alt="user-img"
        />
        <span
          className={
            directMessage.seenLastMessage &&
            directMessage.seenLastMessage[sessionUser.id]
              ? "dm-users side-bar"
              : "dm-users side-bar new-dm-message"
          }
          style={dmUsers.length > 2 ? { marginLeft: "14px" } : {}}
        >
          {names}
        </span>
        {directMessage.seenLastMessage &&
        directMessage.seenLastMessage[sessionUser.id]
          ? null
          : showBadge && <span id="dm-notification-badge">1</span>}
      </div>
    </div>
  );
};

export default SidebarDmItem;
