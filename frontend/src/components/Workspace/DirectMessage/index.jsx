import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import consumer from "../../../consumer";
// import { fetchChannel, getChannel } from "../../../store/channels";

const DirectMessage = ({ conversation, subs }) => {
  const [body, setBody] = useState("");
  const [usersInDirectMessage, setUsersInDirectMessage] = useState({});
  const dispatch = useDispatch();
  const { clientId, directMessageId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   enterChannel();
  // }, []);
  // console.log("dm subs:", dm);

  // const enterChannel = () => {
  //   dispatch(fetchChannel(channelId));
  // };
  // console.log(channel);
  return null;
};

export default DirectMessage;
