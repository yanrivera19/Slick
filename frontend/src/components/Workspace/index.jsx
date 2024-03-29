import Chat from "./Chat";
import SideBar from "./SideBar";
import NewMessage from "./NewMessage";
import { useState, useEffect, useRef } from "react";
import consumer from "../../consumer";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspace, getWorkspace } from "../../store/workspaces";
import { useHistory, useParams } from "react-router-dom";
import {
  editChannel,
  fetchChannel,
  getChannel,
  removeChannel,
} from "../../store/channels";
import {
  fetchDirectMessage,
  getDirectMessage,
  editDirectMessage,
} from "../../store/directMessages";
import {
  receiveMessage,
  removeMessage,
  editMessage,
} from "../../store/messages";
import { editWorkspace } from "../../store/workspaces";
import { receiveNewDirectMessage } from "../../store/directMessages";
import { receiveNewChannel } from "../../store/channels";
import userProfileImg from "../../assets/images/default-user-img.png";

const Workspace = () => {
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const workspace = useSelector(getWorkspace(workspaceId));
  const dispatch = useDispatch();
  const dms = useSelector((state) => Object.values(state.directMessages));
  const channels = useSelector((state) => Object.values(state.channels));
  const channelSubscriptions = [];
  const directMessageSubscriptions = [];
  const [shownConversation, setShownConversation] = useState(null);
  const [conversationType, setConversationType] = useState(null);
  const [newDmMessage, setNewDmMessage] = useState(false);
  const [newChannel, setNewChannel] = useState(false);
  const [userProfilePop, setUserProfilePop] = useState(false);
  let lastMsg;
  const dmUsersArray = [];
  let subs = [];
  const profilePopRef = useRef();
  const history = useHistory();
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const [editedChannel, setEditedChannel] = useState(false);
  const [toggleNewMessageSent, setToggleNewMessageSent] = useState(false);
  const [toggleNewMembers, setTogggleNewMembers] = useState(false);

  useEffect(() => {
    dispatch(fetchWorkspace(workspaceId)).then((data) => {
      setWorkspaceUsers(Object.values(data.workspace.users));
      subscription(data.workspace, "WorkspacesChannel");
      if (data.workspace.directMessages) {
        createSubscriptions(
          Object.values(data.workspace.directMessages),
          "DirectMessagesChannel"
        );
      }

      createSubscriptions(
        Object.values(data.workspace.channels),
        "ChannelsChannel"
      );
    });

    return () => {
      subs.forEach((roomSub) => roomSub.unsubscribe());
    };
  }, [
    workspaceId,
    dms.length,
    channels.length,
    editedChannel,
    toggleNewMessageSent,
    toggleNewMembers,
  ]);

  const createSubscriptions = (rooms, roomName) => {
    rooms.forEach((room) => {
      subscription(room, roomName);
    });
  };

  const subscription = (room, name) => {
    let roomName = name;

    let sub = consumer.subscriptions.create(
      {
        channel: roomName,
        id: room.id,
      },
      {
        connected: () => {
          // console.log("connected");
        },
        received: ({
          type,
          message,
          id,
          directMessage,
          channel,
          workspace,
        }) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              dispatch(receiveMessage(message));
              setToggleNewMessageSent(!toggleNewMessageSent);
              break;
            case "RECEIVE_NEW_DIRECT_MESSAGE":
              if (directMessage.users[sessionUser.id]) {
                if (directMessage.messages.authorId === sessionUser.id) {
                  setNewDmMessage(false);
                  setShownConversation(directMessage);
                  setConversationType("DirectMessage");
                  dispatch(receiveNewDirectMessage(directMessage));
                }
                setToggleNewMessageSent(!toggleNewMessageSent);
              }
              break;
            case "RECEIVE_NEW_CHANNEL":
              if (channel.ownerId === sessionUser.id) {
                setNewDmMessage(false);

                setNewChannel(true);
                setShownConversation(channel);
                setConversationType("Channel");
              }
              dispatch(receiveNewChannel(channel));
              break;
            case "EDIT_MESSAGE":
              dispatch(editMessage(message));
              lastMsg = message;
              break;
            case "REMOVE_MESSAGE":
              dispatch(removeMessage(id));
              break;
            case "EDIT_WORKSPACE":
              dispatch(editWorkspace(workspace));
              setTogggleNewMembers(!toggleNewMembers);
              break;
            case "EDIT_CHANNEL":
              if (channel.ownerId === sessionUser.id) {
                setShownConversation(channel);
              }
              dispatch(editChannel(channel));
              setEditedChannel(!editedChannel);
              break;
            case "EDIT_DIRECT_MESSAGE":
              if (directMessage.users[sessionUser.id]) {
                dispatch(editDirectMessage(directMessage));
                setEditedChannel(!editedChannel);
              }
              break;
            case "REMOVE_CHANNEL":
              setConversationType(null);
              dispatch(removeChannel(id));
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
    setNewChannel(false);
    setNewDmMessage(false);
    setShownConversation(channel);
    setConversationType(channelType);
  };

  const handleNewMessageClick = () => {
    setNewChannel(false);
    setShownConversation(null);
    setConversationType(null);
    setNewDmMessage(true);
  };

  const closeAddChannelModal = () => {
    setNewChannel(!newChannel);
  };

  const dmUsersNames = (users) => {
    let filteredUsers = Object.values(users).filter(
      (user) => user.username !== sessionUser.username
    );

    let uniqueUsers = [...new Set(filteredUsers)];

    let results = uniqueUsers.map((user, idx) => {
      if (idx === filteredUsers.length - 1) {
        return user.username;
      } else {
        return user.username + ", ";
      }
    });

    dmUsersArray.push([results.join("")]);
    return results.join("");
  };

  const handleClosingUserPop = (e) => {
    if (userProfilePop && !profilePopRef.current.contains(e.target)) {
      setUserProfilePop(false);
    }
  };

  return workspace ? (
    <div className="app-container" onClick={handleClosingUserPop}>
      <nav className="app-nav">
        <div className="nav-left-side"></div>
        <div className="app-search-cont">
          <button className="app-search-bar"></button>
          <button></button>
        </div>
        <div className="nav-right-side">
          <div className="profile-img-cont" ref={profilePopRef}>
            <span
              className="profile-img"
              onClick={() => setUserProfilePop(true)}
            >
              <img src={userProfileImg} alt="user-profile" />
              <div className="online-sign"></div>
            </span>
            {userProfilePop && (
              <div className="profile-popup">
                <div className="user-status-container">
                  <img src={userProfileImg} alt="user-profile" />
                  <div>
                    <p className="username-in-popup">{sessionUser.username}</p>
                    <div id="status-info">
                      <div className="online-sign-inside"></div>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                <div className="separator">
                  <hr className="separator-line" />
                </div>
                <div className="profile-popup-items-cont">
                  <span
                    onClick={() =>
                      history.push(
                        `/client/${sessionUser.id}/get-started/landing`
                      )
                    }
                    className="profile-popup-items"
                  >{`Sign out of ${workspace.name}`}</span>
                </div>
              </div>
            )}
          </div>
        </div>
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
          closeAddChannelModal={closeAddChannelModal}
          setNewChannel={setNewChannel}
          newChannel={newChannel}
          newMessageSent={toggleNewMessageSent}
          shownConversation={shownConversation}
        />
        {conversationType === "Channel" ? (
          <Chat
            conversation={shownConversation}
            subs={channelSubscriptions}
            channelType={conversationType}
            fetchConversation={fetchChannel}
            getConversation={getChannel}
            dms={dms}
            channels={channels}
            newDmMessage={newDmMessage}
            newChannel={newChannel}
            setNewChannel={setNewChannel}
            newMessageSent={toggleNewMessageSent}
            newMembers={toggleNewMembers}
          />
        ) : conversationType === "DirectMessage" ? (
          <Chat
            conversation={shownConversation}
            subs={directMessageSubscriptions}
            channelType={conversationType}
            dms={dms}
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
            channels={channels}
            newDmMessage={newDmMessage}
            newMessageSent={toggleNewMessageSent}
          />
        ) : null}
        {newDmMessage ? (
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
