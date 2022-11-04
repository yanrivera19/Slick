import csrfFetch from "./csrf";
import { RECEIVE_CHANNEL } from "./channels";
import { RECEIVE_DIRECT_MESSAGE } from "./directMessages";

export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "messages/REMOVE_MESSAGE";

export const receiveMessage = (message) => {
  return {
    type: RECEIVE_MESSAGE,
    message,
  };
};

export const removeMessage = (messageId) => {
  return {
    type: REMOVE_MESSAGE,
    messageId,
  };
};

export const getMessage = (messageId) => (state) => {
  return state.messages ? state.messages[messageId] : null;
};

export const fetchMessage = (messageId) => async (dispatch) => {
  const res = await fetch(`/api/messages/${messageId}`);

  if (res.ok) {
    const message = await res.json();

    dispatch(receiveMessage(message));
  }
};

export const createMessage = (message) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages`, {
    method: "POST",
    body: JSON.stringify(message),
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(receiveMessage(message));
  }
};

export const updateMessage = (message) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/${message.id}`, {
    method: "PUT",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(receiveMessage(message));
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/messages/${messageId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeMessage(messageId));
  }
};

export default function messageReducer(state = {}, action) {
  // debugger;
  switch (action.type) {
    case RECEIVE_CHANNEL:
      return action.channel.messages ? { ...action.channel.messages } : null;
    case RECEIVE_DIRECT_MESSAGE:
      return action.directMessage.messages
        ? { ...action.directMessage.messages }
        : null;
    case RECEIVE_MESSAGE:
      return action.message
        ? { ...state, [action.message.id]: action.message }
        : { ...state };
    // return action.message
    //   ? { ...state, [action.message.id]: action.message }
    //   : null;
    case REMOVE_MESSAGE:
      const newState = { ...state };
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
}
