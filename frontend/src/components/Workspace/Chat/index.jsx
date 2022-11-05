import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} from "../../../store/messages";
import ChatBox from "../ChatBox";
import getTimeOfMessage from "../../../util";
import Message from "./Message";

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

  const messages = useSelector((state) => {
    return Object.values(state.messages).filter((message) => {
      if (
        message.messageableId === conversation.id &&
        message.messageableType === channelType
      ) {
        return message;
      }
    });
  });
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [editOrDeleteMsg, setEditOrDeleteMsg] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // debugger;
    dispatch(fetchConversation(conversation.id));
  }, [conversation]);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };
  // useEffect(() => {
  //   // scrollToBottomChat();
  //   // let lastMsgPos = document.querySelector("#last-msg-position");
  //   // lastMsgPos.current?.scrollIntoView();
  //   scrollDown();
  //   lastMessageRef.current.scrollIntoView({
  //     block: "end",
  //   });
  // }, [lastMessage, conversation.name]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // setLastMessage(messageContent);

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

    setMessageContent("");
  };

  console.log(messages);

  if (!conversation) return null;
  console.log(conversation);
  return (
    <div
      style={{
        width: "81vw",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <header className="chat-header">
        <div className="chat-header-cont">
          <span>
            {channelType === "Channel"
              ? conversation.name
              : conversation.users.map((user, idx) => {
                  if (idx === conversation.users.length - 1) {
                    return user.username;
                  } else {
                    return user.username + ", ";
                  }
                })}
          </span>
        </div>
      </header>
      <div className="messages-container" ref={messageContRef}>
        {messages
          ? Object.values(messages).map((message) => {
              return <Message key={message.id} message={message} />;
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
