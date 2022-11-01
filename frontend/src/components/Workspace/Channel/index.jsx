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

  const channel = useSelector(getChannel(conversation.id));

  useEffect(() => {
    dispatch(fetchChannel(conversation.id));
  }, [conversation.id]);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };
  // console.log(channel);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      createMessage({
        content: messageContent,
        authorId: sessionUser.id,
        messageableType: "Channel",
        messageableId: channel.id,
      })
    ).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  if (!channel) return null;

  // console.log(channel);

  return (
    <>
      {Object.values(channel.messages).length > 0 &&
        Object.values(channel.messages).map((message) => {
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
