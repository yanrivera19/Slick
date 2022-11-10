import { createChannel } from "../../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchUsers } from "../../../store/user";
import { useParams } from "react-router-dom";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import HashTagIcon from "../../Svgs&Icons/HashTagIcon";
import { createDirectMessage } from "../../../store/directMessages";

const CreateChannelModal = ({ handleAddChannel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const createChannel = (e) => {
    e.preventDefault();

    dispatch(
      createDirectMessage({
        name: name,
        description: description,
        workspaceId: workspaceId,
        ownerId: sessionUser.id,
      })
    );

    handleAddChannel();
  };

  return (
    <div id="create-channel-modal">
      <div className="create-modal-header">
        <h1 id="create-header">Create a channel</h1>
        <button onClick={handleAddChannel} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="create-channel-info">
        <p id="info-create-channel">
          Channels are where your team communicates. They're best when organized
          around a topic — #marketing, for example.
        </p>
        <div className="">
          <form onSubmit={createChannel}>
            <p className="label">Name</p>
            <input
              className="input-field name"
              placeholder="# e.g. plan-budget"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex">
              <p className="label">Description</p>
              <span className="clear-text">{"(optional)"}</span>
            </div>
            <input
              className="input-field"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p id="about-text" className="clear-text">
              What's this channel about?
            </p>
          </form>
        </div>
      </div>
      {/* <div
        className={`create-channel-btn ${
          name.trim().length > 0 ? "ready" : ""
        }`}
      > */}
      <button
        disabled={name.trim().length < 1}
        className={`create-channel-btn ${
          name.trim().length > 0 ? "ready" : ""
        }`}
        onClick={handleAddChannel}
      >
        Create
      </button>
      {/* </div> */}
    </div>
  );
};

export default CreateChannelModal;
