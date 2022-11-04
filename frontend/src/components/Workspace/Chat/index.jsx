import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
import { fetchChannel, getChannel } from "../../../store/channels";
import {
  createMessage,
  updateMessage,
  deleteMessage,
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

  const messages = useSelector((state) => state.messages);
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

  // const handleMouseOver = (e, messageId) => {
  //   hoveredElement = messageId;
  // };

  // const handleMouseOut = (e, messageId) => {
  //   hoveredElement = undefined;
  // };

  // const scrollDown = () => {
  //   lastMessageRef?.current?.scrollIntoView();
  // };

  // const scrollToBottomChat = () => {
  //   const scroll = ref.current.scrollHeight - ref.current.clientHeight;

  //   ref.current.scrollTo(0, scroll);
  // };

  // const handleEditMsg = (e, msgId) => {
  //   e.preventDefault();
  //   // setLastMessage(messageContent);
  //   setMessageContent("");

  //   dispatch(updateMessage(msgId));
  //   setEditOrDeleteMsg(true);
  // };

  // const handleDeleteMsg = (e, msgId) => {
  //   dispatch(deleteMessage(msgId));
  //   setEditOrDeleteMsg(true);
  // };

  if (!conversation) return null;
  console.log(hoveredElement);
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
              //   return !editMode ? (
              //     <div
              //       className="message-cont"
              //       onMouseOver={(e) => handleMouseOver(e, message.content)}
              //       onMouseOut={(e) => handleMouseOut(e, message.content)}
              //     >
              //       {/* <div
              //         className={
              //           `${hoveredElement === message.content}`
              //             ? "edit-delete-box"
              //             : "hide"
              //         }
              //       ></div> */}
              //       <div style={{ padding: "8px 20px" }}>
              //         <div
              //           style={{
              //             marginBottom: "5px",
              //             display: "flex",
              //             alignItems: "flex-end",
              //           }}
              //         >
              //           <strong>
              //             {message.author
              //               ? message.author.username
              //               : message.authorName}
              //           </strong>
              //           <span id="time-of-msg">
              //             {getTimeOfMessage(message.createdAt)}
              //           </span>
              //           <div
              //             style={{
              //               display: `${
              //                 sessionUser.id === message.authorId
              //                   ? "flex"
              //                   : "none"
              //               }`,
              //             }}
              //           >
              //             <button
              //               style={{ margin: "0 10px" }}
              //               onClick={(e) => handleDelete(e, message.id)}
              //             >
              //               DELETE
              //             </button>
              //             {/* <button onClick={(e) => handleEdit(e, message)}>
              //               EDIT
              //             </button> */}
              //             <button onClick={(e) => setEditMode(!editMode)}>
              //               EDIT
              //             </button>
              //           </div>
              //         </div>
              //         <p>{message.content}</p>
              //       </div>
              //     </div>
              //   ) : (
              //     <div id="edit-textarea">
              //       <div className="chat-cont">
              //         <div className="top-chat"></div>
              //         <div className="textarea-container">
              //           <form onSubmit={(e) => handleEdit(e, message)}>
              //             <textarea
              //               value={messageContent}
              //               onChange={(e) => setMessageContent(e.target.value)}
              //             />
              //             <div className="bottom-chat">
              //               <button onClick={(e) => setEditMode(!editMode)}>
              //                 Cancel
              //               </button>
              //               <button>Save</button>
              //             </div>
              //           </form>
              //         </div>
              //       </div>
              //     </div>
              //   );
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
