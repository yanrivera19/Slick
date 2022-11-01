export const RECEIVE_DIRECT_MESSAGE = "direct_messages/RECEIVE_direct_message";
// export const REMOVE_DIRECT_MESSAGE = "direct_messages/REMOVE_direct_message";

export const receiveDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage,
  };
};

export const getDirectMessage = (directMessageId) => (state) => {
  return state.directMessages ? state.directMessages[directMessageId] : null;
};

export const fetchDirectMessage = (directMessageId) => async (dispatch) => {
  const res = await fetch(`/api/directMessages/${directMessageId}`);

  if (res.ok) {
    const directMessage = await res.json();
    dispatch(receiveDirectMessage(directMessage));
  }
};

export const createDirectMessage = (directMessage) => async (dispatch) => {
  const res = await fetch(`/api/directMessages`, {
    method: "POST",
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

export const updateDirectMessage = (directMessage) => async (dispatch) => {
  const res = await fetch(`/api/directMessages/${directMessage.id}`, {
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
//   const res = await fetch(`/api/directMessages/${directMessageId}`, {
//     method: "DELETE",
//   });

//   if (res.ok) {
//     dispatch(removeDirectMessage(directMessageId));
//   }
// };

export default function directMessageReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DIRECT_MESSAGE:
      return { ...state, [action.directMessage.id]: action.directMessage };
    // case REMOVE_DIRECT_MESSAGE:
    //   const newState = { ...state };
    //   delete newState[action.directMessageId];
    //   return newState;
    default:
      return state;
  }
}
