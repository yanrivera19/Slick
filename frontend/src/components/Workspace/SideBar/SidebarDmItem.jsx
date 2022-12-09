import userImg4 from "../../../assets/images/default-user-img4.png";

const SidebarDmItem = ({
  directMessage,
  handleRoomClick,
  names,
  sessionUser,
  selected,
}) => {
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
        {directMessage.users.length > 1 && (
          <button
            className={
              selected ? "dm-users-count transparent-bg" : "dm-users-count"
            }
          >
            <p style={{ lineHeight: "1.4em" }}>{directMessage.users.length}</p>
          </button>
        )}

        <img
          className="user-img-default"
          height={directMessage.users.length > 1 ? 14 : 21}
          width={directMessage.users.length > 1 ? 14 : 21}
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
          style={directMessage.users.length > 1 && { marginLeft: "14px" }}
        >
          {names}
        </span>
        {directMessage.seenLastMessage &&
        directMessage.seenLastMessage[sessionUser.id] ? null : (
          <span id="dm-notification-badge">1</span>
        )}
      </div>
    </div>
  );
};

export default SidebarDmItem;
