import csrfFetch from "./csrf";
import { RECEIVE_CHANNEL } from "./channels";
import { RECEIVE_DIRECT_MESSAGE } from "./directMessages";

export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "messages/REMOVE_MESSAGE";
export const EDIT_MESSAGE = "messages/EDIT_MESSAGE";

export const receiveMessage = (message) => {
  // debugger;
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

export const editMessage = (message) => {
  // debugger;
  return {
    type: EDIT_MESSAGE,
    message,
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
    //ERROR HANDLING
    // const message = await res.json();
    // debugger;
    // dispatch(receiveMessage(message));
  }
};

export const updateMessage = (message) => async (dispatch) => {
  // debugger;
  const res = await csrfFetch(`/api/messages/${message.id}`, {
    method: "PUT",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    //ERROR HANDLING
    // const message = await res.json();
    // // debugger;
    // dispatch(editMessage(message));
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
      // debugger;
      return { ...action.channel.messages };
    case RECEIVE_DIRECT_MESSAGE:
      return { ...action.directMessage.messages };
    case RECEIVE_MESSAGE:
      // debugger;
      return { ...state, [action.message.id]: action.message };
    case EDIT_MESSAGE:
      // return { ...state, [action.message.id]: action.message };
      return action.message
        ? { ...state, [action.message.id]: action.message }
        : { ...state };
    case REMOVE_MESSAGE:
      const newState = { ...state };
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
}
