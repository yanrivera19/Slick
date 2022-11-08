import { createChannel } from "../../../store/channels";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchUsers } from "../../../store/user";
import { useParams } from "react-router-dom";
import CrossIcon from "../../Svgs&Icons/CrossIcon";

const CreateChannelModal = ({ handleAddChannel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { workspaceId } = useParams();

  return (
    <div id="delete-modal">
      <div className="delete-modal-header">
        <h1 id="delete-header">Create a channel</h1>
        <button onClick={handleAddChannel} className="cross-btn">
          <CrossIcon size={22} />
        </button>
      </div>
      <div id="create-channel-info">
        <p>
          Channels are where your team communicates. They're best when organized
          around a topic — #marketing, for example.
        </p>
        <div className="">
          <form>
            <p>Name</p>
            <input
              className="input-field name"
              placeholder="# e.g. plan-budget"
            />
            <p>
              Description <span>{"(optional)"}</span>
            </p>
            <input className="input-field" />
            <p id="about-text">What's this channel about?</p>
          </form>
        </div>
      </div>
      <div
        className={`create-channel-btn ${
          name.trim().length > 0 ? "ready" : ""
        }`}
      >
        <button onClick={handleAddChannel}>Create</button>
      </div>
    </div>
  );
};

export default CreateChannelModal;
