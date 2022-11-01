import csrfFetch from "./csrf";

const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const loginUser = (user) => async (dispatch) => {
  const { email, password } = user;
  let res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  let data = await res.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data.user));
  return res;
};

export const logoutUser = () => async (dispatch) => {
  let res = await csrfFetch("/api/session", {
    method: "DELETE",
  });

  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return res;
};

export const signUpUser =
  ({ username, email, password }) =>
  async (dispatch) => {
    let res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(receiveUser(data.user));
    return res;
  };

export const restoreSession = () => async (dispatch) => {
  let res = await csrfFetch(`/api/session`);
  storeCSRFToken(res);
  const data = await res.json();
  storeCurrentUser(data.user);
  dispatch(receiveUser(data.user));
  return res;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
