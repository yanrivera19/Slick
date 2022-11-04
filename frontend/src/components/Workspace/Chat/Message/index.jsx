import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTimeOfMessage from "../../../../util";
import { updateMessage, deleteMessage } from "../../../../store/messages";

const Message = ({ message }) => {
  const [editMode, setEditMode] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const dispatch = useDispatch();
  let hoveredElement = "";

  const handleEdit = (e, msg) => {
    e.preventDefault();
    // setLastMessage(messageContent);

    dispatch(
      updateMessage({
        ...msg,
        content: messageContent,
      })
    );

    setMessageContent("");
    // setEditOrDeleteMsg(true);
    setEditMode(!editMode);
  };

  const handleDelete = (e, msgId) => {
    dispatch(deleteMessage(msgId));
    // setEditOrDeleteMsg(true);
  };

  const handleMouseOver = (e, messageId) => {
    hoveredElement = messageId;
  };

  const handleMouseOut = (e, messageId) => {
    hoveredElement = undefined;
  };

  return !editMode ? (
    <div
      className="message-cont"
      onMouseOver={(e) => handleMouseOver(e, message.content)}
      onMouseOut={(e) => handleMouseOut(e, message.content)}
    >
      {/* <div
                    className={
                      `${hoveredElement === message.content}`
                        ? "edit-delete-box"
                        : "hide"
                    }
                  ></div> */}
      <div style={{ padding: "8px 20px" }}>
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
          <span id="time-of-msg">{getTimeOfMessage(message.createdAt)}</span>
          <div
            style={{
              display: `${
                sessionUser.id === message.authorId ? "flex" : "none"
              }`,
            }}
          >
            <button
              style={{ margin: "0 10px" }}
              onClick={(e) => handleDelete(e, message.id)}
            >
              DELETE
            </button>
            {/* <button onClick={(e) => handleEdit(e, message)}>
                          EDIT
                        </button> */}
            <button onClick={(e) => setEditMode(!editMode)}>EDIT</button>
          </div>
        </div>
        <p>{message.content}</p>
      </div>
    </div>
  ) : (
    <div id="edit-textarea">
      <div className="chat-cont">
        <div className="top-chat"></div>
        <div className="textarea-container">
          <form onSubmit={(e) => handleEdit(e, message)}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="bottom-chat">
              <button onClick={(e) => setEditMode(!editMode)}>Cancel</button>
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
