import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} from "../../../store/messages";
import { getTimeOfMessage, getDate } from "../../../util";
import Message from "./Message";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import CaretOutlineIcon from "../../Svgs&Icons/CaretOutlineIcon";
import userImg1 from "../../../assets/images/default-user-img.png";
import userImg2 from "../../../assets/images/default-user-img2.png";
import userImg3 from "../../../assets/images/default-user-img3png.png";
import userImg4 from "../../../assets/images/default-user-img4.png";
import userImg5 from "../../../assets/images/default-user-img-5.png";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import EmojiOutlineIcon from "../../Svgs&Icons/EmojiOutlineIcon";
import { BsEmojiSmile, BsEmojiLaughing } from "react-icons/bs";
import HashTagIconBold from "../../Svgs&Icons/HashTagIconBold";
import ChannelInfoModal from "./ChannelInfoModal";

const Chat = ({
  conversation,
  subs,
  channelType,
  dms,
  channels,
  fetchConversation,
  getConversation,
  lastMsg,
  newMessage,
  newChannel,
  setNewChannel,
  sentNewMsg,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [date, setDate] = useState(null);
  const userImages = [userImg1, userImg2, userImg3, userImg4, userImg5];
  const users = useSelector((state) => Object.values(state.users));
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();
  const emojiIconRef = useRef();
  const textAreaRef = useRef();
  let usersString = "";
  let messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );
  const [showLaughingEmoji, setShowLaughingEmoji] = useState(false);
  const [showChannelInfoModal, setShowChannelInfoModal] = useState(false);
  let conversationUsers = null;
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchConversation(conversation.id));
  }, [conversation, lastMessage, newMessage, newChannel, editMode, sentNewMsg]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [messages, conversation.name]);

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
  const checkDate = (message, idx) => {
    const today = new Date().toLocaleDateString();
    let messageDate = new Date(message.createdAt).toLocaleDateString();
    let prevMessageDate = null;
    if (idx > 0) {
      prevMessageDate = new Date(
        Object.values(messages)[idx - 1].createdAt
      ).toLocaleDateString();
    }

    if (prevMessageDate) {
      if (messageDate > prevMessageDate && messageDate === today) {
        return "Today";
      } else if (messageDate > prevMessageDate && messageDate !== today) {
        messageDate = getDate(messageDate);
        return messageDate;
      } else {
        return null;
      }
    } else if (messageDate === today) {
      return "Today";
    } else {
      messageDate = getDate(messageDate);
      return messageDate;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLastMessage(messageContent);

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

  const dmUsersNames = (dmUsers) => {
    console.log(dmUsers);
    let filteredUsers = Object.values(dmUsers).filter(
      (user) => user.username !== sessionUser.username
    );

    let results = filteredUsers.map((user, idx) => {
      if (idx === filteredUsers.length - 1) {
        return user.username;
      } else {
        return user.username + ", ";
      }
    });

    return results.join("");
  };

  const handleEmojiPick = (emojiObj, e) => {
    setMessageContent(messageContent + emojiObj.emoji);
    setShowEmojiPicker(false);
    textAreaRef.current.focus();
  };

  const handleChannelNameClick = (e) => {
    setShowChannelInfoModal(!showChannelInfoModal);
    setEditMode(!editMode);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!conversation) return null;

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
          <span>
            {channelType === "Channel" ? (
              <div className="channel-name" onClick={handleChannelNameClick}>
                <span className="hash-tag-chat-room">
                  <HashTagIconBold />
                </span>
                {conversation.name}
                <span>
                  <CaretOutlineIcon />
                </span>
              </div>
            ) : (
              dmUsersNames(conversation.users)
            )}
          </span>
        </div>
        {conversation.users &&
        (channelType === "Channel" || users.length > 2) ? (
          <div className="members-container">
            {users.length > 1 && users.length < 3 ? (
              <>
                <img height={21} width={21} src={userImg1} alt="user-img" />
                <img height={21} width={21} src={userImg3} alt="user-img" />
                <span style={{ paddingLeft: "5px" }}>{users.length}</span>
              </>
            ) : users.length >= 3 ? (
              <>
                <img height={21} width={21} src={userImg1} alt="user-img" />
                <img height={21} width={21} src={userImg3} alt="user-img" />
                <img height={21} width={21} src={userImg5} alt="user-img" />
                <span style={{ paddingLeft: "7px" }}>{users.length}</span>
              </>
            ) : null}
          </div>
        ) : null}
      </header>
      {showChannelInfoModal && (
        <section className="channel-info-modal-container">
          <ChannelInfoModal
            channel={conversation}
            handleChannelNameClick={handleChannelNameClick}
          />
        </section>
      )}
      <div className="messages-container" ref={messageContRef}>
        {messages
          ? Object.values(messages).map((message, idx) => {
              let date = checkDate(message, idx);
              return (
                <Message
                  key={message.id}
                  position={idx}
                  message={message}
                  dateText={date}
                />
              );
            })
          : null}
        <div ref={lastMessageRef}></div>
      </div>

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
                  {/* <EmojiOutlineIcon /> */}
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
                    disabled={messageContent.trim().length < 1}
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

export default Chat;
