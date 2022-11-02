import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import { createMessage } from "../../../store/messages";

const Channel = ({ conversation, subs }) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState({});
  const dispatch = useDispatch();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState();

  // const messages = useSelector(getChannel(conversation.id));
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchChannel(conversation.id));
  }, [conversation.id, lastMessage]);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };
  // console.log(channel);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLastMessage(messageContent);
    setMessageContent("");

    return dispatch(
      createMessage({
        content: messageContent,
        authorId: sessionUser.id,
        messageableType: "Channel",
        messageableId: conversation.id,
      })
    );
  };

  if (!conversation) return null;

  return (
    <>
      {Object.values(messages).length > 0 &&
        Object.values(messages).map((message) => {
          // debugger;
          return (
            <>
              <strong>{message.content}</strong>
              <p style={{ marginBottom: "10px" }}>{message.authorId}</p>
            </>
          );
        })}
      {errors.length > 0 && errors.map((error) => <p>{error}</p>)}
      <form onSubmit={onSubmit}>
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          style={{ border: "2px solid black" }}
        />
        <button>Send</button>
      </form>
    </>
  );
};

export default Channel;
