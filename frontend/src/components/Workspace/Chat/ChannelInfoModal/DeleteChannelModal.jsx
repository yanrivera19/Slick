import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChannel } from "../../../../store/channels";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import { getTimeOfMessage } from "../../../../util";
import HashTagIcon from "../../../Svgs&Icons/HashTagIcon";

const DeleteChannelModal = ({
  channel,
  handleEditChannelModal,
  handleChannelNameClick,
  handleDeleteAlertModal,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    // dispatch(deleteChannel(channel.id));
  };

  return (
    <div id="delete-modal">
      <div className="delete-modal-header">
        <h1 id="delete-header">
          Delete
          <span>
            <HashTagIcon />
          </span>
          {channel.name}
        </h1>
        <button onClick={handleDeleteAlertModal} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="delete-modal-info-cont">
        <p>
          Are you sure you want to delete this channel? This cannot be undone.
        </p>
      </div>
      <div className="cancel-delete-btn-container">
        <button id="cancel-delete-btn" onClick={handleDeleteAlertModal}>
          Cancel
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
