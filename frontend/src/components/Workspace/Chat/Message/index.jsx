import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTimeOfMessage from "../../../../util";
import { updateMessage, deleteMessage } from "../../../../store/messages";
import ThreeDotsVert from "../../../Svgs&Icons/ThreeDotsVert";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import userImg2 from "../../../../assets/images/default-user-img2.png";

const Message = ({ message, position }) => {
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

  const handleEdit = (e, msg) => {
    e.preventDefault();

    dispatch(
      updateMessage({
        ...msg,
        content: messageContent,
      })
    );
    setMessageContent("");
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

  useEffect(() => {
    if (editMode === true) {
      editTextRef.current.scrollIntoView();
    }
  }, [editMode]);

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
                  <strong>
                    {message.author
                      ? message.author.username
                      : message.authorName}
                  </strong>
                  <span id="time-of-msg">
                    {getTimeOfMessage(message.createdAt)}
                  </span>
                </div>
                <p>{message.content}</p>
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
          style={{ padding: "8px 20px", display: "flex", alignItems: "center" }}
        >
          <img
            className="user-img-default"
            height={36}
            width={36}
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
              <strong>
                {message.author ? message.author.username : message.authorName}
              </strong>
              <span id="time-of-msg">
                {getTimeOfMessage(message.createdAt)}
              </span>
            </div>
            <p>{message.content}</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div id="edit-textarea" ref={editTextRef}>
      <div className="chat-cont">
        <div className="top-chat"></div>
        <div className="textarea-container">
          <form onSubmit={(e) => handleEdit(e, message)}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows="1"
            />
            <div className="bottom-chat edit">
              <div className="msg-edit-btns">
                <button
                  id="cancel-edit-btn"
                  onClick={(e) => setEditMode(!editMode)}
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
