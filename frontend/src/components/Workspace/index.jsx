import DirectMessage from "./DirectMessage";
import Channel from "./Channel";
import { useState, useEffect } from "react";
import consumer from "../../consumer";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspace, getWorkspace } from "../../store/workspaces";
import { NavLink, useParams } from "react-router-dom";

const Workspace = () => {
  // const [channels, setChannels] = useState();
  // const [directMessages, setDirectMessages] = useState();
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

  const setDatas = (data) => {
    // if (workspace) {
    // channels = Object.values(workspace.channels);
    // directMessages = Object.values(workspace.directMessages);
    // debugger;
    setChannels(Object.values(data.channels));
    setDirectMessages(Object.values(data.directMessages));
  };

  const subscription = (channelName, channelId) => {
    // debugger;
    return consumer.subscriptions.create(
      // console.log(channelId),
      {
        channel: channelName,
        id: channelId,
      },
      {
        connected: () => {
          console.log("connected");
        },
        received: (message) => {
          debugger;
          console.log("Received message: ", message);
        },
      }
    );
  };

  const handleChannelClick = (e, channel, channelType) => {
    setShownConversation(channel);
    setConversationType(channelType);
  };

  return workspace ? (
    <>
      <h1 style={{ marginBottom: "20px" }}>{workspace.name}</h1>
      <h3 style={{ marginBottom: "5px" }}>Channels:</h3>
      <div style={{ marginBottom: "20px" }}>
        {channels.map((channel) => {
          let channelSub = subscription("ChannelsChannel", channel.id);
          channelSubscriptions.push(channelSub);

          return (
            <p onClick={(e) => handleChannelClick(e, channel, "channel")}>
              {channel.name}
            </p>
          );
        })}
      </div>

      {conversationType === "channel" && (
        <Channel conversation={shownConversation} subs={channelSubscriptions} />
      )}

      <h3 style={{ marginBottom: "5px" }}>Direct Messages:</h3>
      <div style={{ marginBottom: "20px" }}>
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
      </div>

      {conversationType === "dm" && (
        <DirectMessage
          conversation={shownConversation}
          subs={directMessageSubscriptions}
        />
      )}
    </>
  ) : null;
};

export default Workspace;
