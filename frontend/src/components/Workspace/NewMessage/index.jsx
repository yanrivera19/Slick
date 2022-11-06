import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import SearchResults from "../SearchResults";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} from "../../../store/messages";

const NewMessage = ({ users, channels }) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState({});
  const dispatch = useDispatch();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState("");

  //  const messages = useSelector((state) => {
  //    return Object.values(state.messages).filter((message) => {
  //      if (
  //        message.messageableId === conversation.id &&
  //        message.messageableType === channelType
  //      ) {
  //        return message;
  //      }
  //    });
  //  });
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [editOrDeleteMsg, setEditOrDeleteMsg] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const data = [...channels, ...Object.values(users)];

  const onSubmit = (e) => {
    //CREATE A DIRECT MESSAGE SUBSCRIPTIONS FOR USERS INVOLVED

    e.preventDefault();
    setErrors([]);

    // dispatch(
    //   createMessage({
    //     content: messageContent,
    //     authorName: sessionUser.username,
    //     authorId: sessionUser.id,
    //     messageableType: channelType,
    //     messageableId: conversation.id,
    //   })
    // );

    setLastMessage(messageContent);
    setMessageContent("");
  };

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
          <span>New message</span>
        </div>
      </header>
      <section className="new-msg-search-container">
        {/* <div ref={lastMessageRef}></div> */}
        <div className="new-msg-search">
          <span className="to-new-msg">To:</span>
          <input
            className="search-input"
            type="text"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        </div>
      </section>
      {searchInputValue.length > 0 && (
        <SearchResults inputValue={searchInputValue} data={data} />
      )}

      <section id="chat-box">
        <div className="chat-cont">
          <div className="top-chat"></div>
          <div className="textarea-container">
            <form onSubmit={onSubmit}>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows="1"
                placeholder="Start a new message"
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

export default NewMessage;
