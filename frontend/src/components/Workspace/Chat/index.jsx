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
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import CaretOutlineIcon from "../../Svgs&Icons/CaretOutlineIcon";

const Chat = ({
  conversation,
  subs,
  channelType,
  dms,
  fetchConversation,
  getConversation,
  lastMsg,
  // forNewMessage = false
}) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState({});
  const dispatch = useDispatch();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  //  const dms = useSelector((state) => {
  //    return Object.values(state.directMessages);
  //  });

  // const dmMessages = useSelector((state) => {
  //   // debugger;
  //   // return state.messages
  //   //   ? Object.values(state.messages).filter((message) => {
  //   //       if (
  //   //         message.messageableId === conversation.id &&
  //   //         message.messageableType === channelType
  //   //       ) {
  //   //         return message;
  //   //       }
  //   //     })
  //   //   : {};
  //   return state.directMessage
  //     ? Object.values(state.directMessage.messages)
  //     : [];
  // });
  // const channelMessages = useSelector((state) => {
  //   return state.channel ? Object.values(state.channel.messages) : [];
  // });
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [editOrDeleteMsg, setEditOrDeleteMsg] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(null);

  let usersString = "";

  let messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );

  useEffect(() => {
    debugger;
    dispatch(fetchConversation(conversation.id));
  }, [conversation, channelType, messages.length, dms.length]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [messages.length, conversation.name]);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      createMessage({
        content: messageContent,
        authorName: sessionUser.username,
        authorId: sessionUser.id,
        messageableType: channelType,
        messageableId: conversation.id,
      })
    );

    setLastMessage(messageContent);
    setMessageContent("");
  };

  const dmUsersNames = (users) => {
    console.log(users);
    let filteredUsers = users.filter(
      (user) => user.username !== sessionUser.username
    );
    // console.log(filteredUsers);
    let results = filteredUsers.map((user, idx) => {
      if (idx === filteredUsers.length - 1) {
        return user.username;
      } else {
        return user.username + ", ";
      }
    });

    // console.log(results);
    return results.join("");
  };

  if (!conversation) return null;
  // console.log(conversation.name);
  // console.log(channelType);
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
              : dmUsersNames(conversation.users)}
          </span>
        </div>
      </header>
      <div className="messages-container" ref={messageContRef}>
        {messages
          ? Object.values(messages).map((message, idx) => {
              return (
                <Message key={message.id} position={idx} message={message} />
              );
            })
          : null}
        <div ref={lastMessageRef}></div>
      </div>

      <section id="chat-box">
        <div className="chat-cont">
          <div className="top-chat"></div>
          <div className="textarea-container">
            <form onSubmit={onSubmit}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows="1"
                placeholder={`Message #${
                  channelType === "Channel"
                    ? conversation.name
                    : dmUsersNames(conversation.users)
                }`}
              />
              <div className="bottom-chat">
                <div
                  className={`send-msg-cont ${
                    messageContent.trim().length > 0 ? "ready" : ""
                  }`}
                >
                  <button
                    disabled={messageContent.trim().length < 1}
                    className="send-btn"
                  >
                    <SendMsgIcon />
                  </button>
                  {/* <button disabled={messageContent.trim().length < 1}>
                    <CaretOutlineIcon />
                  </button> */}
                </div>
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
