import csrfFetch from "./csrf";
import { receiveWorkspace, getWorkspace } from "./workspaces";
import { RECEIVE_WORKSPACE } from "./workspaces";

export const RECEIVE_DIRECT_MESSAGE = "directMessages/RECEIVE_DIRECT_MESSAGE";
export const RECEIVE_NEW_DIRECT_MESSAGE =
  "directMessages/RECEIVE_DIRECT_MESSAGE";
// export const REMOVE_DIRECT_MESSAGE = "direct_messages/REMOVE_direct_message";

export const receiveDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage,
  };
};

export const receiveNewDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_NEW_DIRECT_MESSAGE,
    directMessage,
  };
};

export const getDirectMessage = (directMessageId) => (state) => {
  return state.directMessages ? state.directMessages[directMessageId] : null;
};

export const fetchDirectMessage = (directMessageId) => async (dispatch) => {
  const res = await fetch(`/api/direct_messages/${directMessageId}`);

  if (res.ok) {
    const directMessage = await res.json();
    dispatch(receiveDirectMessage(directMessage));
  }
};

export const createDirectMessage =
  (directMessage, users, message) => async (dispatch) => {
    const res = await csrfFetch(`/api/direct_messages`, {
      method: "POST",
      body: JSON.stringify(directMessage, users, message),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      // const directMessage = await res.json();
      // dispatch(receiveDirectMessage(directMessage));
      //   // const workspace = await dispatch(
      //   //   getWorkspace(directMessage.directMessage.workspaceId)
      //   // );
      //   // dispatch(receiveWorkspace(workspace));
      // return directMessage;
    }
  };

export const updateDirectMessage = (directMessage) => async (dispatch) => {
  const res = await csrfFetch(`/api/direct_messages/${directMessage.id}`, {
    method: "PUT",
    body: JSON.stringify(directMessage),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const directMessage = await res.json();
    dispatch(receiveDirectMessage(directMessage));
  }
};

// export const deleteDirectMessage = (directMessageId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/direct_messages/${directMessageId}`, {
//     method: "DELETE",
//   });

//   if (res.ok) {
//     dispatch(removeDirectMessage(directMessageId));
//   }
// };

export default function directMessageReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      return { ...action.workspace.directMessages };
    case RECEIVE_DIRECT_MESSAGE:
      return {
        ...state,
        [action.directMessage.id]: action.directMessage,
      };

    case RECEIVE_NEW_DIRECT_MESSAGE:
      return {
        ...state,
        [action.directMessage.id]: action.directMessage,
      };

    // case REMOVE_DIRECT_MESSAGE:
    //   const newState = { ...state };
    //   delete newState[action.directMessageId];
    //   return newState;
    default:
      return state;
  }
}
