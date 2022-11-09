import Chat from "./Chat";
import SideBar from "./SideBar";
import NewMessage from "./NewMessage";
import { useState, useEffect } from "react";
import consumer from "../../consumer";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspace, getWorkspace } from "../../store/workspaces";
import { NavLink, useParams } from "react-router-dom";
import { fetchChannel, getChannel } from "../../store/channels";
import {
  fetchDirectMessage,
  getDirectMessage,
} from "../../store/directMessages";
import {
  receiveMessage,
  removeMessage,
  editMessage,
  fetchMessage,
  getMessage,
} from "../../store/messages";
import { getUsers, fetchUsers } from "../../store/user";

const Workspace = () => {
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const workspace = useSelector(getWorkspace(workspaceId));
  const dispatch = useDispatch();
  const [directMessages, setDirectMessages] = useState([]);
  //HOW COULD I USE THE JOIN TABLES TO SAVE THE SUBSCRIPTIONS IN THE DB??
  // const [channelSubscriptions, setChannelSubscriptions] = useState([]);
  // const [directMessageSubscriptions, setDirectMessageSubscriptions] = useState(
  //   []
  // );co
  // const [dmLength, setDmLength] = useState(0);

  const dms = useSelector((state) => {
    return Object.values(state.directMessages);
  });

  const channels = useSelector((state) => Object.values(state.channels));
  // const dmUsers = useSelector((state) => {
  //   return state.directMessage ? Object.values(state.directMessage.users) : [];
  // });
  const channelSubscriptions = [];
  const directMessageSubscriptions = [];
  const [shownConversation, setShownConversation] = useState(null);
  const [conversationType, setConversationType] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  let lastMsg;
  const dmUsersArray = [];
  let subs = [];
  let dmLength = 0;

  useEffect(() => {
    debugger;
    dispatch(fetchWorkspace(workspaceId)).then((data) => {
      createSubscriptions(Object.values(data.workspace.directMessages));
      createSubscriptions(Object.values(data.workspace.channels));
    });

    // dmLength = dms.length;

    return () => {
      subs.forEach((channelSub) => channelSub.unsubscribe());
    };
  }, [workspaceId, dms.length]);

  const createSubscriptions = (rooms) => {
    rooms.forEach((room) => {
      subscription(room);
    });
  };

  const subscription = (room) => {
    let roomName =
      room.type === "Channel" ? "ChannelsChannel" : "DirectMessagesChannel";

    let sub = consumer.subscriptions.create(
      {
        channel: roomName,
        id: room.id,
      },
      {
        connected: () => {
          console.log("connected");
        },
        received: ({ type, message, id }) => {
          // debugger;
          switch (type) {
            case "RECEIVE_MESSAGE":
              dispatch(receiveMessage(message));
              console.log("received:", message.content);
              break;
            case "EDIT_MESSAGE":
              // debugger;
              dispatch(editMessage(message));
              lastMsg = message;
              console.log("received:", message.content);
              break;
            case "REMOVE_MESSAGE":
              dispatch(removeMessage(id));
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );

    subs.push(sub);
  };

  const handleChannelClick = (e, channel, channelType) => {
    debugger;
    setNewMessage(false);
    setShownConversation(channel);
    setConversationType(channelType);
  };

  const handleNewMessageClick = () => {
    setShownConversation(null);
    setConversationType(null);
    setNewMessage(true);
  };

  const dmUsersNames = (users) => {
    let filteredUsers = users.filter(
      (user) => user.username !== sessionUser.username
    );
    let results = filteredUsers.map((user, idx) => {
      if (idx === filteredUsers.length - 1) {
        return user.username;
      } else {
        return user.username + ", ";
      }
    });

    dmUsersArray.push([results.join("")]);
    return results.join("");
  };

  // console.log(dmUsersArray);

  return workspace ? (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-right-side"></div>
        <div className="app-search-cont">
          <button className="app-search-bar"></button>
          <button></button>
        </div>
        <div className="nav-left-side"></div>
      </nav>
      <div className="app-main-cont">
        <SideBar
          workspace={workspace}
          handleNewMessageClick={handleNewMessageClick}
          channels={channels}
          dms={dms}
          sessionUser={sessionUser}
          handleChannelClick={handleChannelClick}
          dmUsersNames={dmUsersNames}
        />
        {conversationType === "Channel" ? (
          <Chat
            conversation={shownConversation}
            subs={channelSubscriptions}
            channelType={conversationType}
            fetchConversation={fetchChannel}
            getConversation={getChannel}
          />
        ) : conversationType === "DirectMessage" ? (
          <Chat
            conversation={shownConversation}
            subs={directMessageSubscriptions}
            channelType={conversationType}
            dms={dmUsersArray}
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
          />
        ) : null}
        {newMessage ? (
          <NewMessage
            users={Object.values(workspace.users)}
            channels={channels}
            dms={dms}
            dmUsersNames={dmUsersNames}
            handleChannelClick={handleChannelClick}
          />
        ) : null}
      </div>
    </div>
  ) : null;
};

export default Workspace;
