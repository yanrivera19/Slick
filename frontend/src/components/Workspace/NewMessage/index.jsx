import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendMsgIcon from "../../Svgs&Icons/SendMsgIcon";
import csrfFetch from "../../../store/csrf";
import SearchResults from "../SearchResults";
import CrossIcon from "../../Svgs&Icons/CrossIcon";
import {
  createMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} from "../../../store/messages";

import {
  createDirectMessage,
  fetchDirectMessage,
} from "../../../store/directMessages";
import { useParams } from "react-router-dom";

const NewMessage = ({
  users,
  channels,
  dms,
  handleChannelClick,
  dmUsersNames,
  // channelForNewMsg,
  // channelTypeForNewMsg
}) => {
  const [body, setBody] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  // const { clientId, channelId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [messageContent, setMessageContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [lastMessage, setLastMessage] = useState("");
  const messageContRef = useRef();
  const lastMessageRef = useRef(null);
  let hoveredElement = "";
  const [editOrDeleteMsg, setEditOrDeleteMsg] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  // const data = [...channels, ...users, ...dms];
  const data = [...channels, ...users, ...dms];
  const [selectedUsers, setSelectedUsers] = useState([]);
  const oneToOneDmUsers = [];
  const [udm, setudm] = useState();

  // let data;

  // useEffect(() => {}, [usersInRoom]);

  const checkDmWithUser = () => {
    let results = dms.filter((dm) => {
      // debugger;
      if (!dm.users.join("").includes(",")) {
        oneToOneDmUsers.push(...dm);
        return false;
      } else {
        return true;
        // data.push(dm);
      }
    });

    setudm(results);
    // console.log(oneToOneDmUsers);
  };
  // console.log(udm);
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors([]);

  //   const directM = await dispatch(
  //     createDirectMessage({
  //       workspaceId: workspaceId,
  //     })
  //   );

  //   const message = await dispatch(
  //     createMessage(
  //       {
  //         content: messageContent,
  //         authorName: sessionUser.username,
  //         authorId: sessionUser.id,
  //         messageableType: "DirectMessage",
  //         messageableId: directM.directMessage.id,
  //       },
  //       "newConv"
  //     )
  //   );

  //   let usersForNewDm = [...selectedUsers, sessionUser];

  //   // for (let i = 0; i < usersForNewDm.length - 1; i++) {
  //   //   let dmSub = {
  //   //     userId: usersForNewDm[i].id,
  //   //     directMessageId: directM.directMessage.id,
  //   //   };
  //   //   const res = await csrfFetch("/api/direct_message_subscriptions", {
  //   //     method: "POST",
  //   //     body: JSON.stringify(dmSub),
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   });

  //   //   if (res.ok) {
  //   //     let directMessageSub = await res.json();
  //   //     //CATCH ERRORS
  //   //   }
  //   // }

  //   //NEED  TO DO THESE IN A SINGLE REQUEST. MODIFY DIRECT MESSAGE CONTROLLER
  //   //SO THAT IUT EXPECTS MESSAGES AND USERS WHEN CREATED
  //   //JUST CREATE A DIRECT MESSAGE AND PASS TO IT THE NECESSARY INFO

  //   usersForNewDm.forEach(async (user) => {
  //     let dmSub = {
  //       userId: user.id,
  //       directMessageId: directM.directMessage.id,
  //     };
  //     const res = await csrfFetch("/api/direct_message_subscriptions", {
  //       method: "POST",
  //       body: JSON.stringify(dmSub),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       const directMessageSub = await res.json();
  //       //CATCH ERRORS
  //     }
  //   });

  //   // debugger;
  //   handleChannelClick(e, directM.directMessage, "DirectMessage");
  //   setLastMessage(messageContent);
  //   setMessageContent("");
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let usersForNewDm = [...selectedUsers, sessionUser];
    // dmUsersNames(usersForNewDm);

    dispatch(
      createDirectMessage({
        workspaceId: workspaceId,
        users: usersForNewDm,
        message: {
          content: messageContent,
          authorName: sessionUser.username,
          authorId: sessionUser.id,
          messageableType: "DirectMessage",
        },
      })
    ).then((dm) => {
      // dispatch(
      //   createMessage({
      //     content: messageContent,
      //     authorName: sessionUser.username,
      //     authorId: sessionUser.id,
      //     messageableType: "DirectMessage",
      //     messageableId: dm.directMessage.id,
      //   })
      // );

      // debugger;
      handleChannelClick(e, dm.directMessage, "DirectMessage");
      // setLastMessage(messageContent);
      // setMessageContent("");
    });
    // }
    // return dmSubs;
    // });
  };
  // }
  // return dmSubs;
  // });

  // console.log(data);
  // console.log(oneToOneDmUsers);

  const handleResultClick = (e, user) => {
    // if (!selectedUsers.includes(user)) {
    setSelectedUsers((users) => [...users, user]);
    setSearchInputValue("");
    // }
  };

  const removeUserFromNewMsg = (e, user) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
    );
  };

  // console.log(dms);

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="to-new-msg">To:</span>
            {selectedUsers.map((selectedUser) => (
              <div className="selected-user">
                <span style={{ marginRight: "8px" }}>
                  {selectedUser.username}
                </span>
                <button
                  onClick={(e) => removeUserFromNewMsg(e, selectedUser)}
                  className="remove-selected-btn"
                >
                  <CrossIcon size={16} />
                </button>
              </div>
            ))}
          </div>
          <input
            className="search-input"
            type="text"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="#a-channel or @somebody"
          />
        </div>
      </section>
      {searchInputValue.length > 0 && (
        <SearchResults
          inputValue={searchInputValue.toLowerCase()}
          data={data}
          dms={dms}
          handleChannelClick={handleChannelClick}
          handleResultClick={handleResultClick}
          selectedUsers={selectedUsers}
          oneToOneDmUsers={oneToOneDmUsers}
        />
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
                    messageContent.trim().length > 0 && selectedUsers.length > 0
                      ? "ready"
                      : ""
                  }`}
                >
                  <button
                    disabled={
                      messageContent.trim().length === 0 ||
                      selectedUsers.length === 0
                    }
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
