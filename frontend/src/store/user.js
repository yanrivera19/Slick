import { RECEIVE_WORKSPACE } from "./workspaces";
import { RECEIVE_DIRECT_MESSAGE } from "./directMessages";
import { RECEIVE_CHANNEL } from "./channels";
import { RECEIVE_WORKSPACES } from "./workspaces";

export const RECEIVE_USER = "users/RECEIVE_USER";
export const RECEIVE_USERS = "users/RECEIVE_USERS";
// export const RECEIVE_ALL_USERS =

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const getUser = (userId) => (state) => {
  return state.users ? state.users[userId] : null;
};

export const getUsers = (state) => {
  return state.users ? state.users : null;
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`);

  if (res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
  }
};

export const fetchUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users/`);
  // debugger;
  if (res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
};

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      return { ...action.workspace.users };
    case RECEIVE_DIRECT_MESSAGE:
      return { ...action.directMessage.users };
    case RECEIVE_CHANNEL:
      return { ...action.channel.users };
    case RECEIVE_USER:
      return action.user ? { ...state, [action.user.id]: action.user } : null;
    case RECEIVE_USERS:
      return { ...state, ...action.users };
    default:
      return state;
  }
}
