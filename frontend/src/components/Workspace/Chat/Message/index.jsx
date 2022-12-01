import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeOfMessage } from "../../../../util";
import { updateMessage, deleteMessage } from "../../../../store/messages";
import ThreeDotsVert from "../../../Svgs&Icons/ThreeDotsVert";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import userImg2 from "../../../../assets/images/default-user-img2.png";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { BsEmojiSmile, BsEmojiLaughing } from "react-icons/bs";

const Message = ({ message, position, dateText }) => {
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [moreActionsClicked, setMoreActionsClicked] = useState(false);
  const editTextRef = useRef(null);
  const [messageContainer, setMessageContainer] = useState(null);
  const [actionsBox, setActionsBox] = useState(null);
  const [moreActionsBox, setMoreActionsBox] = useState(null);
  const [deleteAlertModal, setDeleteAlertModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showLaughingEmoji, setShowLaughingEmoji] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef();
  const emojiIconRef = useRef();
  const textAreaRef = useRef();

  useEffect(() => {
    if (editMode === true) {
      editTextRef.current.scrollIntoView();
    }
  }, [editMode]);

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      updateMessage({
        ...message,
        content: messageContent,
        edited: true,
      })
    );
    setMessageContent("");
    setShowEmojiPicker(false);
    setEditMode(!editMode);
  };

  const handleTrashClick = () => {
    setDeleteAlertModal(!deleteAlertModal);
  };

  const handleDelete = (e, msgId) => {
    dispatch(deleteMessage(msgId));
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const showMoreActionsPopUp = () => {
    setMoreActionsClicked(!moreActionsClicked);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleEdit(e);
    }
  };

  const handleEmojiPick = (emojiObj, e) => {
    setMessageContent(messageContent + emojiObj.emoji);
    setShowEmojiPicker(false);
    textAreaRef.current.focus();
  };

  return !editMode ? (
    <>
      <section className={deleteAlertModal ? "delete-modal-container" : "hide"}>
        <div id="delete-modal">
          <div className="delete-modal-header">
            <h1 id="delete-header">Delete Message</h1>
            <button onClick={handleTrashClick} className="cross-btn">
              <CrossIcon size={22} />
            </button>
          </div>
          <div id="delete-modal-info-cont">
            <p>
              Are you sure you want to delete this message? This cannot be
              undone.
            </p>
            <div
              className="message-container-modal"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                className="user-img-default"
                height={38}
                width={38}
                src={userImg2}
                alt="user-img"
              />

              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    marginBottom: "5px",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <strong id="name-author">
                    {message.author
                      ? message.author.username
                      : message.authorName}
                  </strong>
                  <span id="time-of-msg">
                    {getTimeOfMessage(message.createdAt)}
                  </span>
                </div>
                <p className="message-text-content">
                  {message.content}
                  {message.edited && <span id="edited-msg">(edited)</span>}
                </p>
              </div>
            </div>
          </div>
          <div className="cancel-delete-btn-container">
            <button id="cancel-delete-btn" onClick={handleTrashClick}>
              Cancel
            </button>
            <button
              id="delete-btn"
              onClick={(e) => handleDelete(e, message.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </section>
      {dateText && (
        <div className="message-divider-container">
          <div className="divider-line">
            <div className="date-text">{dateText}</div>
          </div>
        </div>
      )}
      <div
        className="message-cont"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={messageContainer}
      >
        <div
          className={
            isHovered && sessionUser.id === message.authorId
              ? "edit-delete-box"
              : "hide"
          }
          ref={actionsBox}
          style={position === 0 ? { top: "10px" } : { top: "-15px" }}
        >
          {/* onClick={showMoreActionsPopUp} */}
          <button
            className="pop-menu-btns"
            onClick={(e) => {
              setMessageContent(message.content);
              setEditMode(!editMode);
            }}
          >
            <CiEdit size={20} />
          </button>
          <button className="pop-menu-btns" onClick={handleTrashClick}>
            <BsTrash />
          </button>
        </div>
        <div
          className={moreActionsClicked ? "big-overlayed-div" : "hide"}
          // ={moreActionsBox}
          ref={moreActionsBox}
        ></div>
        <div
          style={{
            padding: "10px 20px",
            display: "flex",
          }}
        >
          <div className="msg-img-container">
            <img
              className="user-img-default"
              height={36}
              width={36}
              src={userImg2}
              alt="user-img"
            />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <div
              style={{
                marginBottom: "5px",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <strong id="name-author">
                {message.author ? message.author.username : message.authorName}
              </strong>
              <span id="time-of-msg">
                {getTimeOfMessage(message.createdAt)}
              </span>
            </div>
            <p className="message-text-content">
              {message.content}
              {message.edited && <span id="edited-msg">(edited)</span>}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div id="edit-textarea" ref={editTextRef}>
      <div className="chat-cont">
        <div className="top-chat"></div>
        <div className="textarea-container">
          <form onSubmit={handleEdit}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows="1"
              onKeyPress={handleEnterKeyPress}
              ref={textAreaRef}
            />
            <div className="bottom-chat edit">
              {showEmojiPicker && (
                <div
                  className="emoji-picker-box"
                  ref={emojiPickerRef}
                  style={position < 6 ? { top: "35px" } : { bottom: "80px" }}
                >
                  <EmojiPicker
                    height={350}
                    width={340}
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
                {/* <EmojiOutlineIcon /> */}
                {showLaughingEmoji ? (
                  <BsEmojiLaughing size={18} className="emoji-laugh-icon" />
                ) : (
                  <BsEmojiSmile size={18} className="emoji-smile-icon" />
                )}
              </div>
              <div className="msg-edit-btns">
                <button
                  id="cancel-edit-btn"
                  onClick={(e) => {
                    setShowEmojiPicker(false);
                    setEditMode(!editMode);
                  }}
                >
                  Cancel
                </button>
                <button id="save-edit-btn">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
