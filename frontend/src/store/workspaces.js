import { RECEIVE_CHANNEL } from "./channels";
import { RECEIVE_DIRECT_MESSAGE } from "./directMessages";
import csrfFetch from "./csrf";

export const RECEIVE_WORKSPACE = "workspaces/RECEIVE_WORKSPACE";
export const RECEIVE_WORKSPACES = "workspaces/RECEIVE_WORKSPACES";
export const REMOVE_WORKSPACE = "workspaces/REMOVE_WORKSPACE";

export const receiveWorkspace = (workspace) => {
  return {
    type: RECEIVE_WORKSPACE,
    workspace,
  };
};

export const receiveWorkspaces = (workspaces) => {
  return {
    type: RECEIVE_WORKSPACES,
    workspaces,
  };
};

export const removeWorkspace = (workspaceId) => {
  return {
    type: REMOVE_WORKSPACE,
    workspaceId,
  };
};

export const getWorkspace = (workspaceId) => (state) => {
  return state.workspaces ? state.workspaces[workspaceId] : null;
};

export const fetchWorkspace = (workspaceId) => async (dispatch) => {
  const res = await fetch(`/api/workspaces/${workspaceId}`);

  if (res.ok) {
    const workspace = await res.json();
    let data = await dispatch(receiveWorkspace(workspace));
		// debugger
    return data;
  }
};

export const fetchWorkspaces = () => async (dispatch) => {
  const res = await fetch(`/api/workspaces/`);
  if (res.ok) {
    const workspaces = await res.json();
    // debugger;
    dispatch(receiveWorkspaces(workspaces));
    // return data;
  }
};

export const createWorkspace = (workspace) => async (dispatch) => {
  const res = await fetch(`/api/workspaces`, {
    method: "POST",
    body: JSON.stringify(workspace),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const workspace = await res.json();
    dispatch(receiveWorkspace(workspace));
  }
};

export const updateWorkspace = (workspace) => async (dispatch) => {
  const res = await fetch(`/api/workspaces/${workspace.id}`, {
    method: "PUT",
    body: JSON.stringify(workspace),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const workspace = await res.json();
    dispatch(receiveWorkspace(workspace));
  }
};

export const deleteWorkspace = (workspaceId) => async (dispatch) => {
  const res = await fetch(`/api/workspaces/${workspaceId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeWorkspace(workspaceId));
  }
};

export default function workspaceReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_WORKSPACE:
      return { ...state, [action.workspace.id]: action.workspace };
    case RECEIVE_WORKSPACES:
      return { ...state, ...action.workspaces };
    case REMOVE_WORKSPACE:
      const newState = { ...state };
      delete newState[action.workspaceId];
      return newState;
    default:
      return state;
  }
}
