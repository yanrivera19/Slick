import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import csrfFetch from "../../../store/csrf";
import SearchResults from "../SearchResults";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} from "../../../store/messages";

import {
  createDirectMessage,
  fetchDirectMessage,
} from "../../../store/directMessages";
import { useParams } from "react-router-dom";

const NewMessage = ({
  users,
  channels,
  dms,
  handleChannelClick,
  dmUsersNames,
}) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [editOrDeleteMsg, setEditOrDeleteMsg] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const data = [...channels, ...users, ...dms];
  const [selectedUsers, setSelectedUsers] = useState([]);
  const oneToOneDmUsers = [];
  const [udm, setudm] = useState();

  const checkDmWithUser = () => {
    let results = dms.filter((dm) => {
      if (!dm.users.join("").includes(",")) {
        oneToOneDmUsers.push(...dm);
        return false;
      } else {
        return true;
      }
    });

    setudm(results);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let usersForNewDm = [...selectedUsers, sessionUser];

    dispatch(
      createDirectMessage({
        workspaceId: workspaceId,
        users: usersForNewDm,
        message: {
          content: messageContent,
          authorName: sessionUser.username,
          authorId: sessionUser.id,
          messageableType: "DirectMessage",
        },
      })
    );
  };

  const handleResultClick = (e, user) => {
    setSelectedUsers((users) => [...users, user]);
    setSearchInputValue("");
  };

  const removeUserFromNewMsg = (e, user) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  return (
    <div
      style={{
        width: "81vw",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <header className="chat-header">
        <div className="chat-header-cont">
          <span>New message</span>
        </div>
      </header>
      <section className="new-msg-search-container">
        <div className="new-msg-search">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="to-new-msg">To:</span>
            {selectedUsers.map((selectedUser) => (
              <div className="selected-user" key={selectedUser.id}>
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
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="#a-channel or @somebody"
          />
        </div>
      </section>
      {searchInputValue.length > 0 && (
        <SearchResults
          inputValue={searchInputValue.toLowerCase()}
          data={data}
          dms={dms}
          handleChannelClick={handleChannelClick}
          handleResultClick={handleResultClick}
          selectedUsers={selectedUsers}
          oneToOneDmUsers={oneToOneDmUsers}
        />
      )}

      <section id="chat-box">
        <div className="chat-cont">
          <div className="top-chat"></div>
          <div className="textarea-container">
            <form onSubmit={onSubmit}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows="1"
                placeholder="Start a new message"
              />
              <div className="bottom-chat">
                <div
                  className={`send-msg-cont ${
                    messageContent.trim().length > 0 && selectedUsers.length > 0
                      ? "ready"
                      : ""
                  }`}
                >
                  <button
                    disabled={
                      messageContent.trim().length === 0 ||
                      selectedUsers.length === 0
                    }
                    className="send-btn"
                  >
                    <SendMsgIcon />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewMessage;
