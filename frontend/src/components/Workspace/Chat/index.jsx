import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import { createMessage } from "../../../store/messages";
import ChatBox from "../ChatBox";
import getTimeOfMessage from "../../../util";

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
  const [lastMessage, setLastMessage] = useState("");

  // const messages = useSelector(getChannel(conversation.id));
  const messages = useSelector((state) => state.messages);
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // debugger;
    dispatch(fetchConversation(conversation.id));
  }, [conversation.id]);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };
  // useEffect(() => {
  //   // scrollToBottomChat();
  //   // let lastMsgPos = document.querySelector("#last-msg-position");
  //   // lastMsgPos.current?.scrollIntoView();
  //   // scrollDown();
  //   lastMessageRef.current.scrollIntoView({
  //     block: "end",
  //   });
  // }, [lastMessage, conversation.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setLastMessage(messageContent);
    setMessageContent("");
    // debugger;

    dispatch(
      createMessage({
        content: messageContent,
        authorName: sessionUser.username,
        authorId: sessionUser.id,
        messageableType: channelType,
        messageableId: conversation.id,
      })
    );
  };

  // const scrollDown = () => {
  //   lastMessageRef?.current?.scrollIntoView();
  // };

  // const scrollToBottomChat = () => {
  //   const scroll = ref.current.scrollHeight - ref.current.clientHeight;

  //   ref.current.scrollTo(0, scroll);
  // };

  if (!conversation) return null;
  console.log(conversation);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <header className="chat-header">
        <div className="chat-header-cont">
          <span>
            {channelType === "Channel"
              ? conversation.name
              : conversation.users.map((user) => user.username + ", ")}
          </span>
        </div>
      </header>
      <div className="messages-container" ref={messageContRef}>
        {messages
          ? Object.values(messages).map((message) => {
              console.log(message.createdAt);
              return (
                <div className="message-cont">
                  <div style={{ padding: "8px 20px" }}>
                    <div style={{ marginBottom: "5px" }}>
                      <strong>
                        {message.author
                          ? message.author.username
                          : message.authorName}
                      </strong>
                      <span id="time-of-msg">
                        {getTimeOfMessage(message.createdAt)}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                </div>
              );
            })
          : null}
        <div
          // id="last-msg-position"
          ref={lastMessageRef}
        ></div>
      </div>

      <section id="chat-box">
        <div className="chat-cont">
          <div className="top-chat"></div>
          <div className="textarea-container">
            <form onSubmit={onSubmit}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <div className="bottom-chat">
                <button>Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
};

export default Chat;
