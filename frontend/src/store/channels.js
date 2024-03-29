import csrfFetch from "./csrf";
import { RECEIVE_WORKSPACE } from "./workspaces";

export const RECEIVE_CHANNEL = "channels/RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "channels/REMOVE_CHANNEL";
export const RECEIVE_NEW_CHANNEL = "channels/RECEIVE_NEW_CHANNEL";
export const EDIT_CHANNEL = "channels/EDIT_CHANNEL";

export const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel,
  };
};

export const receiveNewChannel = (channel) => {
  return {
    type: RECEIVE_NEW_CHANNEL,
    channel,
  };
};

export const removeChannel = (channelId) => {
  return {
    type: REMOVE_CHANNEL,
    channelId,
  };
};

export const editChannel = (channel) => {
  return {
    type: EDIT_CHANNEL,
    channel,
  };
};

export const getChannel = (channelId) => (state) => {
  return state.channels ? state.channels[channelId] : null;
};

export const fetchChannel = (channelId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${channelId}`);

  if (res.ok) {
    const channel = await res.json();
    dispatch(receiveChannel(channel));
    return channel;
  }
};

export const createChannel = (channel) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels`, {
    method: "POST",
    body: JSON.stringify(channel),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.log("error creating channel");
  }
};

export const updateChannel =
  (channel, detailsEdited, seenUser) => async (dispatch) => {
    const res = await csrfFetch(
      `/api/channels/${channel.id}?detailsEdited=${detailsEdited}&seenUser=${seenUser}`,
      {
        method: "PUT",
        body: JSON.stringify(channel),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok && !detailsEdited) {
      const channel = await res.json();
      dispatch(receiveChannel(channel));
    }
  };

export const deleteChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeChannel(channelId));
  }
};

export default function channelReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      return action.workspace.channels ? { ...action.workspace.channels } : {};
    case RECEIVE_CHANNEL:
      return { ...state, [action.channel.id]: action.channel };
    case RECEIVE_NEW_CHANNEL:
      return { ...state, [action.channel.id]: action.channel };
    case EDIT_CHANNEL:
      return action.channel
        ? { ...state, [action.channel.id]: action.channel }
        : { ...state };
    case REMOVE_CHANNEL:
      const newState = { ...state };
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
}
