import HashTagIcon from "../../Svgs&Icons/HashTagIcon";

const SidebarChannelItem = ({
  channel,
  handleRoomClick,
  sessionUser,
  selected,
}) => {
  return (
    <div
      className={selected ? "selected channel-item" : "channel-item hover"}
      onClick={(e) => handleRoomClick(e, channel, "Channel")}
      key={channel.id}
    >
      <span style={{ marginRight: "11px", paddingTop: "4px" }}>
        <HashTagIcon />
      </span>
      <span
        className={
          channel.seenLastMessage && channel.seenLastMessage[sessionUser.id]
            ? ""
            : "new-message"
        }
      >
        {channel.name}
      </span>
    </div>
  );
};

export default SidebarChannelItem;
