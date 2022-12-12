import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import SearchResults from "../SearchResults";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import { createDirectMessage } from "../../../store/directMessages";
import { useParams } from "react-router-dom";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { BsEmojiSmile, BsEmojiLaughing } from "react-icons/bs";
import ChatBox from "../Chat/ChatBox";

const NewMessage = ({ users, channels, dms, handleChannelClick }) => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const data = [...channels, ...dms, ...users];
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showLaughingEmoji, setShowLaughingEmoji] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();
  const emojiIconRef = useRef();
  const textAreaRef = useRef();
  const oneToOneDmUsers = [];
  const searchResultsRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target)
    ) {
      setSearchInputValue("");
    }
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

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit(e);
    }
  };

  const handleEmojiPick = (emojiObj, e) => {
    setMessageContent(messageContent + emojiObj.emoji);
    setShowEmojiPicker(false);
    textAreaRef.current.focus();
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
            onFocus={(e) => setSearchInputValue("")}
          />
        </div>
      </section>
      <div ref={searchResultsRef}>
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
      </div>

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
                onKeyPress={handleEnterKeyPress}
                ref={textAreaRef}
              />
              <div className="bottom-chat">
                {showEmojiPicker && (
                  <div className="emoji-picker-box" ref={emojiPickerRef}>
                    <EmojiPicker
                      height={380}
                      width={355}
                      onEmojiClick={handleEmojiPick}
                      emojiStyle={EmojiStyle.NATIVE}
                    />
                  </div>
                )}
                <div
                  className="emoji-icon"
                  ref={emojiIconRef}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  onMouseEnter={() => setShowLaughingEmoji(true)}
                  onMouseLeave={() => setShowLaughingEmoji(false)}
                >
                  {showLaughingEmoji ? (
                    <BsEmojiLaughing size={18} className="emoji-laugh-icon" />
                  ) : (
                    <BsEmojiSmile size={18} className="emoji-smile-icon" />
                  )}
                </div>
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
      <div id="shift-enter-cont">
        {messageContent.length > 0 && (
          <p className="shift-enter-message">
            <span id="shift-enter-span">Shift + Enter </span>
            to add a new line
          </p>
        )}
      </div>
    </div>
  );
};

export default NewMessage;
