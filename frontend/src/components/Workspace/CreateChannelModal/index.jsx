import { createChannel } from "../../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../store/user";
import { useParams } from "react-router-dom";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import HashTagIcon from "../../Svgs&Icons/HashTagIcon";

const CreateChannelModal = ({ handleAddChannelModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const createNewChannel = (e) => {
    e.preventDefault();

    dispatch(
      createChannel({
        name: name,
        description: description,
        workspaceId: workspaceId,
        ownerId: sessionUser.id,
      })
    );
    setName("");
    setDescription("");
    handleAddChannelModal();
  };

  const handleCloseModal = () => {
    setName("");
    setDescription("");
    handleAddChannelModal();
  };

  return (
    <div id="create-channel-modal">
      <div className="create-modal-header">
        <h1 id="create-header">Create a channel</h1>
        <button onClick={handleCloseModal} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="create-channel-info">
        <p id="info-create-channel">
          Channels are where your team communicates. They're best when organized
          around a topic — #marketing, for example.
        </p>
        <div className="">
          <form onSubmit={createNewChannel}>
            <p className="label">Name</p>
            <input
              value={name}
              className="input-field name"
              placeholder="# e.g. plan-budget"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex">
              <p className="label">Description</p>
              <span className="clear-text">{"(optional)"}</span>
            </div>
            <input
              value={description}
              className="input-field"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p id="about-text" className="clear-text">
              What's this channel about?
            </p>
            <div id="create-channel-btn-container">
              <button
                disabled={name.trim().length < 1}
                className={`create-channel-btn ${
                  name.trim().length > 0 ? "ready" : ""
                }`}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelModal;
