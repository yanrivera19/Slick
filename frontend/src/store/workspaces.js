import csrfFetch from "./csrf";

export const RECEIVE_WORKSPACE = "workspaces/RECEIVE_WORKSPACE";
export const RECEIVE_WORKSPACES = "workspaces/RECEIVE_WORKSPACES";
export const REMOVE_WORKSPACE = "workspaces/REMOVE_WORKSPACE";
export const EDIT_WORKSPACE = "workspaces/EDIT_WORKSPACE";

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

export const editWorkspace = (workspace) => {
  return {
    type: EDIT_WORKSPACE,
    workspace,
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

    return data;
  }
};

export const fetchWorkspaces = () => async (dispatch) => {
  const res = await fetch(`/api/workspaces/`);
  if (res.ok) {
    const workspaces = await res.json();

    dispatch(receiveWorkspaces(workspaces));
  }
};

export const createWorkspace = (workspace, users) => async (dispatch) => {
  const res = await csrfFetch(`/api/workspaces`, {
    method: "POST",
    body: JSON.stringify(workspace, users),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const workspace = await res.json();
    dispatch(receiveWorkspace(workspace));
    return workspace;
  }
};

export const updateWorkspace = (workspace, newUsers) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/workspaces/${workspace.id}?newUsers=${JSON.stringify(newUsers)}`,
    {
      method: "PUT",
      body: JSON.stringify(workspace),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    console.log("error updating workspace");
  }
};

export const deleteWorkspace = (workspaceId) => async (dispatch) => {
  const res = await csrfFetch(`/api/workspaces/${workspaceId}`, {
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
    case EDIT_WORKSPACE:
      return action.workspace
        ? { ...state, [action.workspace.id]: action.workspace }
        : { ...state };
    case REMOVE_WORKSPACE:
      const newState = { ...state };

      delete newState[action.workspaceId];
      return newState;
    default:
      return state;
  }
}
