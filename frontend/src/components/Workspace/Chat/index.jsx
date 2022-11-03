import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import { createMessage } from "../../../store/messages";
import ChatBox from "../ChatBox";

const Chat = ({
  conversation,
  subs,
  channelType,
  fetchConversation,
  getConversation,
  lastMsg,
}) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState({});
  const dispatch = useDispatch();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  // const [lastMessage, setLastMessage] = useState();

  // const messages = useSelector(getChannel(conversation.id));
  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchConversation(conversation.id));
  }, [conversation.id]);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // setLastMessage(messageContent);
    setMessageContent("");
    // debugger;
    return dispatch(
      createMessage({
        content: messageContent,
        authorId: sessionUser.id,
        messageableType: channelType,
        messageableId: conversation.id,
      })
    );
  };

  if (!conversation) return null;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <header className="chat-header"></header>
      <section style={{ height: "100%" }}>
        <div className="messages-container">
          {messages
            ? Object.values(messages).map((message) => {
                return (
                  <div className="message-cont">
                    <div style={{ padding: "8px 20px" }}>
                      <p style={{ marginBottom: "10px" }}>
                        {message.author
                          ? message.author.username
                          : message.authorId}
                      </p>
                      <strong>{message.content}</strong>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </section>

      <section id="chat-box">
        <div className="chat-cont">
          <form onSubmit={onSubmit}>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              style={{ border: "2px solid black" }}
            />
            <button>Send</button>
          </form>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default Chat;
