import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMessage } from "../../../store/messages";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { BsEmojiSmile, BsEmojiLaughing } from "react-icons/bs";

const ChatBox = ({
  conversation,
  channelType,
  handleLastMessage,
  newChannel,
  setNewChannel,
  sessionUser,
  dmUsersNames,
}) => {
  const dispatch = useDispatch();
  const [messageContent, setMessageContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();
  const emojiIconRef = useRef();
  const textAreaRef = useRef();
  const [showLaughingEmoji, setShowLaughingEmoji] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (emojiIconRef.current && emojiIconRef.current.contains(e.target)) {
      setShowEmojiPicker(!showEmojiPicker);
    } else if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleLastMessage(messageContent);

    if (newChannel) {
      setNewChannel(false);
    }

    dispatch(
      createMessage({
        content: messageContent,
        authorName: sessionUser.username,
        authorId: sessionUser.id,
        messageableType: channelType,
        messageableId: conversation.id,
      })
    );

    setMessageContent("");
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
    <>
      <section id="chat-box">
        <div className="chat-cont">
          <div className="top-chat"></div>
          <div className="textarea-container">
            <form onSubmit={onSubmit}>
              <textarea
                value={messageContent}
                onChange={(e) => {
                  setMessageContent(e.target.value);
                }}
                rows="1"
                placeholder={`Message #${
                  channelType === "Channel"
                    ? conversation.name
                    : dmUsersNames(conversation.users)
                }`}
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
                  onClick={() => setShowEmojiPicker(true)}
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
                    messageContent.trim().length > 0 ? "ready" : ""
                  }`}
                >
                  <button
                    disabled={messageContent.trim().length === 0}
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
    </>
  );
};

export default ChatBox;
