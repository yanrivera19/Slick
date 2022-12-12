import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChannel } from "../../../store/channels";
import { updateDirectMessage } from "../../../store/directMessages";
import { getDate } from "../../../util";
import Message from "./Message";
import CaretOutlineIcon from "../../Svgs&Icons/CaretOutlineIcon";
import userImg1 from "../../../assets/images/default-user-img.png";
import userImg3 from "../../../assets/images/default-user-img3png.png";
import userImg5 from "../../../assets/images/default-user-img-5.png";
import HashTagIconBold from "../../Svgs&Icons/HashTagIconBold";
import ChannelInfoModal from "./ChannelInfoModal";
import ChatBox from "./ChatBox";

const Chat = ({
  conversation,
  channelType,
  fetchConversation,
  newMessage,
  newChannel,
  setNewChannel,
  newMessageSent,
  newMembers,
}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [lastMessage, setLastMessage] = useState("");
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );
  const [showChannelInfoModal, setShowChannelInfoModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [conversationUsers, setConversationUsers] = useState(
    Object.values(conversation.users)
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let loaderTimeout = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => {
      clearTimeout(loaderTimeout);
    };
  }, [conversation]);

  useEffect(() => {
    dispatch(fetchConversation(conversation.id)).then((conv) => {
      setConversationUsers(Object.values(conv.users));
    });
  }, [
    conversation,
    lastMessage,
    newMessage,
    newChannel,
    editMode,
    newMessageSent,
    newMembers,
  ]);

  useEffect(() => {
    let contentEdited = false;

    if (channelType === "Channel") {
      dispatch(
        updateChannel(
          {
            ...conversation,
          },
          contentEdited,
          sessionUser.id
        )
      );
    } else if (channelType === "DirectMessage") {
      dispatch(
        updateDirectMessage(
          {
            ...conversation,
          },
          sessionUser.id
        )
      );
    }
  }, [channelType, conversation.id, newMessageSent]);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [messages, conversation.name]);

  const checkDate = (message, idx) => {
    const today = new Date().toLocaleDateString();
    let messageDate = new Date(message.createdAt).toLocaleDateString();
    let prevMessageDate = null;
    if (idx > 0) {
      prevMessageDate = new Date(
        Object.values(messages)[idx - 1].createdAt
      ).toLocaleDateString();
    }

    if (prevMessageDate) {
      if (messageDate > prevMessageDate && messageDate === today) {
        return "Today";
      } else if (messageDate > prevMessageDate && messageDate !== today) {
        messageDate = getDate(messageDate);
        return messageDate;
      } else {
        return null;
      }
    } else if (messageDate === today) {
      return "Today";
    } else {
      messageDate = getDate(messageDate);
      return messageDate;
    }
  };

  const dmUsersNames = (dmUsers) => {
    let filteredUsers = Object.values(dmUsers).filter(
      (user) => user.username !== sessionUser.username
    );

    let results = filteredUsers.map((user, idx) => {
      if (idx === filteredUsers.length - 1) {
        return user.username;
      } else {
        return user.username + ", ";
      }
    });

    return results.join("");
  };

  const handleChannelNameClick = (e) => {
    setShowChannelInfoModal(!showChannelInfoModal);
    setEditMode(!editMode);
  };

  const handleLastMessage = (messageContent) => {
    setLastMessage(messageContent);
  };

  if (!conversation) return null;

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
            {channelType === "Channel" ? (
              <div className="channel-name" onClick={handleChannelNameClick}>
                <span className="hash-tag-chat-room">
                  <HashTagIconBold />
                </span>
                {conversation.name}
                <span>
                  <CaretOutlineIcon />
                </span>
              </div>
            ) : (
              dmUsersNames(conversation.users)
            )}
          </span>
        </div>
        {conversationUsers &&
        (channelType === "Channel" || conversationUsers.length > 2) ? (
          <div className="members-container">
            {conversationUsers.length > 1 && conversationUsers.length < 3 ? (
              <>
                <img height={21} width={21} src={userImg1} alt="user-img" />
                <img height={21} width={21} src={userImg3} alt="user-img" />
                <span style={{ paddingLeft: "5px" }}>
                  {conversationUsers.length}
                </span>
              </>
            ) : conversationUsers.length >= 3 ? (
              <>
                <img height={21} width={21} src={userImg1} alt="user-img" />
                <img height={21} width={21} src={userImg3} alt="user-img" />
                <img height={21} width={21} src={userImg5} alt="user-img" />
                <span style={{ paddingLeft: "7px" }}>
                  {conversationUsers.length}
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </header>
      {showChannelInfoModal && (
        <section className="channel-info-modal-container">
          <ChannelInfoModal
            channel={conversation}
            handleChannelNameClick={handleChannelNameClick}
          />
        </section>
      )}
      <div className="messages-container" ref={messageContRef}>
        {messages &&
          !loader &&
          Object.values(messages).map((message, idx) => {
            let date = checkDate(message, idx);
            return (
              <div key={message.id}>
                <Message position={idx} message={message} dateText={date} />
              </div>
            );
          })}
        <div ref={lastMessageRef}></div>
        {loader && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <ChatBox
        conversation={conversation}
        channelType={channelType}
        handleLastMessage={handleLastMessage}
        newChannel={newChannel}
        setNewChannel={setNewChannel}
        sessionUser={sessionUser}
        dmUsersNames={dmUsersNames}
      />
    </div>
  );
};

export default Chat;
