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
import { getUsers, fetchUsers } from "../../store/user";
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
  // );co
	// const [dmLength, setDmLength] = useState(0);

  const dms = useSelector((state) => {
		// setDmLength(state.directMessages.length)
		return Object.values(state.directMessages)}
		);

  // const messages = useSelector((state) => Object.values(state.messages));

  const channelss = useSelector((state) => Object.values(state.channels));
  const dmUsers = useSelector((state) => {
    return state.directMessage ? Object.values(state.directMessage.users) : [];
  });
  const channelSubscriptions = [];
  const directMessageSubscriptions = [];
  const [channelSubs, setChannelSubs] = useState([]);
  const [shownConversation, setShownConversation] = useState(null);
  const [conversationType, setConversationType] = useState(null);
  const [newMessage, setNewMessage] = useState(false);
  const [channelForNewMsg, setChannelForNewMsg] = useState();
  const [channelTypeForNewMsg, setChannelTypeForNewMsg] = useState();
  let lastMsg;
  const dmUsersArray = [];
  let subs = [];
		let dmLength = 0;


  useEffect(() => {

    dispatch(fetchWorkspace(workspaceId));

    //  dispatch(fetchWorkspace(workspaceId)).then((data) => {
    setDatas();
    //  });
		dmLength = dms.length;

    return () => {
      channelSubs.forEach((channelSub) => channelSub.unsubscribe());
      // channelSubscriptions.forEach((channelSub) => channelSub.unsubscribe());
      // directMessageSubscriptions.forEach((dmSub) => dmSub.unsubscribe());
    };
  }, [workspaceId, dmLength]);

  // useEffect(() => {

  // }, [messages])

  // useEffect(() => {
  //   dms.forEach((dm) => {
  //     dispatch(fetchDirectMessage(dm.id));
  //   });
  // }, [dms.length]);

  const subscription = (rooms) => {
    rooms.forEach((room) => {
      let roomName =
        room.type === "Channel" ? "ChannelsChannel" : "DirectMessagesChannel";
      // debugger;
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

      subs.push(sub);
    });

    // console.log("subs:", subs);
    // setChannelSubs([...subs]);
  };

  const setDatas = (data) => {
    // setChannels(Object.values(data.channels));
    // setDirectMessages(Object.values(data.directMessages));
    // subscription(Object.values(data.channels));
    // subscription(Object.values(data.directMessages));
    subscription(dms);
    subscription(channelss);
  };

  const checkUsersDm = (dms) => {};

  const handleChannelClick = (e, channel, channelType, newMsg = false) => {
    // debugger;
    setNewMessage(false);
    setShownConversation(channel);
    setConversationType(channelType);
  };

  const handleNewMessageClick = () => {
    setShownConversation(null);
    setConversationType(null);
    setNewMessage(true);
  };

  const checkDmUsers = (dm) => {
    let usersString = "";
    // debugger;
    dm.users
      .map((user) => {
        if (user.id !== sessionUser.id) {
          usersString += user.username + ", ";
          return user.username;
        }
      })
      .join(", ")
      .slice(0, usersString.length - 2);

    dmUsersArray.push(usersString);
  };

  const addDmUsersNames = () => {};

  // const checkDmUsers = (dm) => {
  // 	dispatch(fetchDirectMessage(dm.id));
  // }

  console.log(dmUsersArray);

  console.log("dms:", dms);
  console.log("channels:", channelss);
  // console.log("dm-users:", dmUsers);

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
              {channelss.map((channel) => {
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
                } else {
                  return null;
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
              {dms.map((directMessage, idx) => {
                // if (sessionUser.directMessages[directMessage.id]) {
                const members = directMessage.users;
                const names = members.map((member) => {
                    if (member.username !== sessionUser.username)
                      return member.username;
                  })
                  .join(", ");
                // debugger;
                return (
                  <div
                    className="dm-item"
                    key={directMessage.id}
                    onClick={(e) => handleChannelClick(e, directMessage, "dm")}
                  >
                    {/* // return ( */}
                    <div className="dm-item" key={directMessage.id}>
                      <span></span>
                      <span className="dm-users">{names}</span>
                    </div>
                    {/* // ); */}
                  </div>
                );
                // } else {
                //   return null;
                // }
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
            channels={channelss}
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
