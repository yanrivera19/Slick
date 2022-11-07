import DirectMessage from "./DirectMessage";
import Channel from "./Channel";
import Chat from "./Chat";
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
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import WriteIcon from "../Svgs&Icons/WriteMsgIcon";
import HashTagIcon from "../Svgs&Icons/HashTagIcon";

const Workspace = () => {
  const { workspaceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const workspace = useSelector(getWorkspace(workspaceId));
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);
  const [directMessages, setDirectMessages] = useState([]);
  //HOW COULD I USE THE JOIN TABLES TO SAVE THE SUBSCRIPTIONS IN THE DB??
  // const [channelSubscriptions, setChannelSubscriptions] = useState([]);
  // const [directMessageSubscriptions, setDirectMessageSubscriptions] = useState(
  //   []
  // );
  const channelSubscriptions = [];
  const directMessageSubscriptions = [];

  const [shownConversation, setShownConversation] = useState(null);
  const [conversationType, setConversationType] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const [channelForNewMsg, setChannelForNewMsg] = useState();
  const [channelTypeForNewMsg, setChannelTypeForNewMsg] = useState();
  let lastMsg;
  let dmUsersString = "";
  const dmUsersArray = [];

  useEffect(() => {
    dispatch(fetchWorkspace(workspaceId)).then((data) => {
      setDatas(data.workspace);
    });

    return () => {
      channelSubscriptions.forEach((channelSub) => channelSub.unsubscribe());
      directMessageSubscriptions.forEach((dmSub) => dmSub.unsubscribe());
    };
  }, [workspaceId]);

  const subscription = (rooms) => {
    rooms.forEach((room) => {
      let roomName =
        room.type === "Channel" ? "ChannelsChannel" : "DirectMessagesChannel";
      // debugger;
      return consumer.subscriptions.create(
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
                // debugger;
                dispatch(receiveMessage(message));
                // lastMsg = message;
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
    });
    // console.log(consumer);
  };

  const setDatas = (data) => {
    setChannels(Object.values(data.channels));
    setDirectMessages(Object.values(data.directMessages));
    subscription(Object.values(data.channels));
    subscription(Object.values(data.directMessages));
  };

  const checkUsersDm = (dms) => {};

  const handleChannelClick = (e, channel, channelType, newMsg = false) => {
    setNewMessage(false);
    setShownConversation(channel);
    setConversationType(channelType);
  };

  const handleNewMessageClick = () => {
    setConversationType(null);
    setNewMessage(true);
  };

  const checkDmUsers = (dm) => {
    let includesUser = false;
    dmUsersString = "";

    dm.users.map((user, idx) => {
      if (user.username === sessionUser.username) {
        includesUser = true;
      } else {
        dmUsersString += user.username + ", ";
      }
    });

    if (includesUser) {
      dmUsersArray.push({
        dmUsers: dmUsersString.slice(0, dmUsersString.length - 2),
        dm: dm,
        id: dm.id,
      });
    }
  };

  console.log(dmUsersString);

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
        <aside className="app-side-bar">
          <div>
            <header className="workspace-header">
              <div className="workspace-header-cont">
                <div>
                  <span id="works-name">{workspace.name}</span>
                  <span></span>
                </div>
                <button className="write-btn" onClick={handleNewMessageClick}>
                  <WriteIcon />
                </button>
              </div>
            </header>
            <section id="extras-section">
              <div>
                <span>Direct messages</span>
                <span></span>
              </div>
            </section>
            <section id="channel-section">
              <div className="channel-item-header">
                <span className="square-btn-sidebar">
                  <BsFillCaretDownFill size={12} />
                </span>
                <span>Channels</span>
              </div>
              {channels.map((channel) => {
                if (sessionUser.channels[channel.id]) {
                  return (
                    <div
                      className="channel-item"
                      onClick={(e) => handleChannelClick(e, channel, "channel")}
                      key={channel.id}
                    >
                      <span style={{ marginRight: "11px", paddingTop: "4px" }}>
                        <HashTagIcon />
                      </span>
                      <span>{channel.name}</span>
                    </div>
                  );
                }
              })}
              <div className="channel-item-header">
                <span className="square-btn-sidebar plus">
                  <FaPlus size={10} />
                </span>
                <span>Add channels</span>
              </div>
            </section>
            <section id="dm-section">
              <div className="dm-item-header">
                <span className="square-btn-sidebar">
                  <BsFillCaretDownFill size={12} />
                </span>
                <span>Direct messages</span>
              </div>
              {directMessages.map((directMessage) => {
                if (sessionUser.directMessages[directMessage.id]) {
                  return (
                    <div
                      className="dm-item"
                      key={directMessage.id}
                      onClick={(e) =>
                        handleChannelClick(e, directMessage, "dm")
                      }
                    >
                      {checkDmUsers(directMessage)}

                      {/* // return ( */}
                      <div className="dm-item" key={directMessage.id}>
                        <span></span>
                        <span className="dm-users">{dmUsersString}</span>
                      </div>
                      {/* // ); */}
                    </div>
                  );
                }
              })}
              <div className="dm-item-header">
                <span className="square-btn-sidebar plus">
                  <FaPlus size={10} />
                </span>
                <span>Add teammates</span>
              </div>
            </section>
          </div>
          <section id="sidebar-footer">
            <p>{sessionUser.username}</p>
          </section>
        </aside>
        {conversationType === "channel" ? (
          <Chat
            conversation={shownConversation}
            subs={channelSubscriptions}
            channelType="Channel"
            fetchConversation={fetchChannel}
            getConversation={getChannel}
          />
        ) : conversationType === "dm" ? (
          <Chat
            conversation={shownConversation}
            subs={directMessageSubscriptions}
            channelType="DirectMessage"
            dms={dmUsersArray}
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
          />
        ) : null}
        {newMessage ? (
          <NewMessage
            users={Object.values(workspace.users)}
            channels={channels}
            dms={dmUsersArray}
            handleChannelClick={handleChannelClick}
          />
        ) : null}

        {/* <h3 style={{ marginBottom: "5px" }}>Direct Messages:</h3> */}
        {/* <div style={{ marginBottom: "20px" }}>
				{directMessages.map((directMessage) => {
					let dmSub = subscription("DirectMessagesChannel", directMessage.id);
					directMessageSubscriptions.push(dmSub);

					return (
						<p onClick={(e) => handleChannelClick(e, directMessage, "dm")}>
							{directMessage.users.map((user) => {
								return `${user.username}, `;
							})}
						</p>
					);
				})}
			</div> */}

        {/* {conversationType === "dm" ? (
          <Chat
            conversation={shownConversation}
            subs={directMessageSubscriptions}
            channelType="DirectMessage"
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
            lastMsg={lastMsg}
          />
        ) : null} */}
      </div>
      {/* <h1 style={{ marginBottom: "20px" }}>{workspace.name}</h1> */}
      {/* <h3 style={{ marginBottom: "5px" }}>Channels:</h3> */}
      {/* <div style={{ marginBottom: "20px" }}>
        {channels.map((channel) => {
          let channelSub = subscription("ChannelsChannel", channel.id);
          console.log(channelSub);
          channelSubscriptions.push(channelSub);

          return (
            <p onClick={(e) => handleChannelClick(e, channel, "channel")}>
              {channel.name}
            </p>
          );
        })}
      </div> */}
    </div>
  ) : null;
};

export default Workspace;
