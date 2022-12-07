import { useState } from "react";
import { updateChannel } from "../../../../store/channels";
import { useDispatch } from "react-redux";
import CrossIcon from "../../../Svgs&Icons/CrossIcon";
import HashTagIconBold from "../../../Svgs&Icons/HashTagIconBold";
import DeleteChannelModal from "./DeleteChannelModal";

const EditChannelModal = ({
  channel,
  handleEditChannelModal,
  handleChannelNameClick,
}) => {
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);
  const [errors, setErrors] = useState([]);
  const [deleteAlertModal, setDeleteAlertModal] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      updateChannel({
        ...channel,
        name: name,
        description: description,
      })
    );
    handleChannelNameClick();
  };

  const handleDeleteAlertModal = (e) => {
    setDeleteAlertModal(!deleteAlertModal);
  };

  return (
    <>
      <section className={deleteAlertModal ? "delete-modal-container" : "hide"}>
        <DeleteChannelModal
          channel={channel}
          handleEditChannelModal={handleEditChannelModal}
          handleChannelNameClick={handleChannelNameClick}
          handleDeleteAlertModal={handleDeleteAlertModal}
        />
      </section>
      <div className="modal-header-container">
        <h1 className="modal-header">
          Edit
          <span className="hash-tag-bold">
            <HashTagIconBold size={"24"} />
          </span>
          {channel.name}
        </h1>
        <button onClick={handleEditChannelModal} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="edit-channel-info">
        <form onSubmit={handleEdit}>
          <p className="label">Name</p>
          <input
            value={name}
            className="input-field name"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex">
            <p className="label">Description</p>
          </div>
          <input
            value={description}
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div id="edit-channel-btn-container">
            <button
              className="cancel-edit-btn channel"
              onClick={handleEditChannelModal}
            >
              Cancel
            </button>
            <button
              disabled={name.trim().length < 1}
              className={`save-edit-btn channel ${
                name.trim().length > 0 ? "ready" : ""
              }`}
            >
              Save
            </button>
          </div>
        </form>
        {/* <button
          className="delete-btn-channel"
          onClick={(e) => setDeleteAlertModal(!deleteAlertModal)}
        >
          Delete
        </button> */}
        <div className="delete-channel-link-cont">
          <p className="delete-channel-link" onClick={handleDeleteAlertModal}>
            Delete channel
          </p>
        </div>
      </div>
    </>
  );
};

export default EditChannelModal;
