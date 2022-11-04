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
import { receiveMessage, fetchMessage, getMessage } from "../../store/messages";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiOutlinePlus,
} from "react-icons/ai";

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

//send msg svg

{
  /* <svg
  data-y5v="true"
  aria-hidden="true"
  viewBox="0 0 20 20"
  class=""
  style="--s:16px;"
>
  <path
    fill="currentColor"
    d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.807a.73.73 0 0 1 0 1.306L2.5 18.46l-.076.018a.749.749 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.789v-4.54Z"
  ></path>
</svg>; */
}

//caret outline (send message and see workplace details)

{
  /* <svg data-y5v="true" aria-hidden="true" viewBox="0 0 20 20" class="">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"
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
      // debugger
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
      return consumer.subscriptions.create(
        {
          channel: roomName,
          id: room.id,
        },
        {
          connected: () => {
            console.log("connected");
          },
          received: (message) => {
            dispatch(receiveMessage(message.message));
            lastMsg = message;
            console.log("received:", message.message.content);
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
                  <svg
                    data-0zo="true"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    class=""
                  >
                    <path
                      fill="#3f0e40"
                      fill-rule="evenodd"
                      d="M16.707 3.268a1 1 0 0 0-1.414 0l-.482.482 1.439 1.44.482-.483a1 1 0 0 0 0-1.414l-.025-.025ZM15.19 6.25l-1.44-1.44-5.068 5.069-.431 1.871 1.87-.431L15.19 6.25Zm-.957-4.043a2.5 2.5 0 0 1 3.536 0l.025.025a2.5 2.5 0 0 1 0 3.536L11.03 12.53a.75.75 0 0 1-.361.2l-3.25.75a.75.75 0 0 1-.9-.899l.75-3.25a.75.75 0 0 1 .2-.361l6.763-6.763ZM5.25 4A2.25 2.25 0 0 0 3 6.25v8.5A2.25 2.25 0 0 0 5.25 17h8.5A2.25 2.25 0 0 0 16 14.75v-4.5a.75.75 0 1 1 1.5 0v4.5a3.75 3.75 0 0 1-3.75 3.75h-8.5a3.75 3.75 0 0 1-3.75-3.75v-8.5A3.75 3.75 0 0 1 5.25 2.5h4.5a.75.75 0 0 1 0 1.5h-4.5Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
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
                    onClick={(e) => handleChannelClick(e, directMessage, "dm")}
                  >
                    {directMessage.users.map((user) => {
                      return (
                        <>
                          <span></span>
                          <span>{`${user.username}, `}</span>
                        </>
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
            lastMsg={lastMsg}
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

        {conversationType === "dm" ? (
          <Chat
            conversation={shownConversation}
            subs={directMessageSubscriptions}
            channelType="DirectMessage"
            fetchConversation={fetchDirectMessage}
            getConversation={getDirectMessage}
            lastMsg={lastMsg}
          />
        ) : null}
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
