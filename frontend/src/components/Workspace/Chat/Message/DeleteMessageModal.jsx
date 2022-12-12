import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../../../store/messages";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import { getTimeOfMessage } from "../../../../util";

const DeleteMessageModal = ({ handleTrashClick, message, userImg2 }) => {
  const dispatch = useDispatch();

  const handleDelete = (e, msgId) => {
    dispatch(deleteMessage(msgId));
  };

  return (
    <div id="delete-modal">
      <div className="delete-modal-header">
        <h1 id="delete-header">Delete Message</h1>
        <button onClick={handleTrashClick} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="delete-modal-info-cont">
        <p>
          Are you sure you want to delete this message? This cannot be undone.
        </p>
        <div
          className="message-container-modal"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
            }}
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
      </div>
      <div className="cancel-delete-btn-container">
        <button id="cancel-delete-btn" onClick={handleTrashClick}>
          Cancel
        </button>
        <button
          className="delete-btn"
          onClick={(e) => handleDelete(e, message.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteMessageModal;
