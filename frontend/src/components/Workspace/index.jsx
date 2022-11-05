import DirectMessage from "./DirectMessage";
import Channel from "./Channel";
import Chat from "./Chat";
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
import WriteIcon from "../Svgs&Icons/WriteMsgIcon";

//hashtag  icon

{
  /* <svg
  data-y5v="true"
  aria-hidden="true"
  data-qa="sidebar-channel-icon-prefix"
  data-sidebar-channel-icon="channel"
  viewBox="0 0 20 20"
  class=""
  style="--s:16px;"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.74 3.877a.75.75 0 1 0-1.48-.254L7.68 7H3.75a.75.75 0 0 0 0 1.5h3.67L6.472 14H2.75a.75.75 0 0 0 0 1.5h3.463l-.452 2.623a.75.75 0 1 0 1.478.254l.496-2.877h3.228l-.452 2.623a.75.75 0 1 0 1.478.254l.496-2.877h3.765a.75.75 0 0 0 0-1.5h-3.506l.948-5.5h3.558a.75.75 0 0 0 0-1.5h-3.3l.54-3.123a.75.75 0 0 0-1.48-.254L12.43 7H9.2l.538-3.123ZM11.221 14l.948-5.5H8.942L7.994 14h3.228Z"
    clip-rule="evenodd"
  ></path>
</svg>; */
}

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
  let lastMsg;

  useEffect(() => {
    // (async () => {
    //   const res = await dispatch(fetchWorkspace(workspaceId));
    //   setChannels(Object.values(workspace.channels));
    //   setDirectmessages(Object.values(workspace.directMessages));
    // })();
    // console.log(channels);
    dispatch(fetchWorkspace(workspaceId)).then((data) => {
      setDatas(data.workspace);
    });
    //THIS .then is NOT WORKING PROPERLY
    // .then(() => {
    //   console.log(channels);
    //   channels.forEach((channel) => {
    //     let channelSub = subscription("ChannelsChannel", channel.id);
    //     setChannelSubscriptions((prevState) => [...prevState, channelSub]);
    //   });

    //   // directMessages.forEach((directMessage) => {
    //   //   let dmSub = subscription("DirectMessagesChannel", directMessage.id);
    //   //   setDirectMessageSubscriptions((prevState) => [...prevState, dmSub]);
    //   // });
    // });

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
    // if (workspace) {
    // channels = Object.values(workspace.channels);
    // directMessages = Object.values(workspace.directMessages);
    // debugger;
    setChannels(Object.values(data.channels));
    setDirectMessages(Object.values(data.directMessages));
    subscription(Object.values(data.channels));
    subscription(Object.values(data.directMessages));
  };

  // const subscription = (channelName, channelId) => {
  //   // debugger;
  //   console.log(consumer);
  //   return consumer.subscriptions.create(
  //     {
  //       channel: channelName,
  //       id: channelId,
  //     },
  //     {
  //       connected: () => {
  //         console.log("connected");
  //       },
  //       received: (message) => {
  //         debugger;
  //         dispatch(receiveMessage(message.message));
  //         // lastMsg = message;
  //         console.log("received:", message.message.content);
  //       },
  //     }
  //   );
  // };

  const handleChannelClick = (e, channel, channelType) => {
    // debugger;
    setShownConversation(channel);
    setConversationType(channelType);
  };
  console.log(channels);

  // console.log(conversationType);
  // console.log(shownConversation);

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
                <button className="write-btn">
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
                <span></span>
                <span>Channels</span>
              </div>
              {channels.map((channel) => {
                return (
                  <div
                    className="channel-item"
                    onClick={(e) => handleChannelClick(e, channel, "channel")}
                    key={channel.id}
                  >
                    <span></span>
                    <span>{channel.name}</span>
                  </div>
                );
              })}
            </section>
            <section id="dm-section">
              <div className="dm-item-header">
                <span></span>
                <span>Direct messages</span>
              </div>
              {directMessages.map((directMessage) => {
                return (
                  <div
                    className="dm-item"
                    key={directMessage.id}
                    onClick={(e) => handleChannelClick(e, directMessage, "dm")}
                  >
                    {directMessage.users.map((user) => {
                      return (
                        <div key={user.id}>
                          <span></span>
                          <span>{`${user.username}, `}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
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
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
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
