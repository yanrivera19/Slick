export const RECEIVE_WORKSPACE = "workspaces/RECEIVE_WORKSPACE";
export const REMOVE_WORKSPACE = "workspaces/REMOVE_WORKSPACE";

export const receiveWorkspace = (workspace) => {
  return {
    type: RECEIVE_WORKSPACE,
    workspace,
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
    return data;
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
    case REMOVE_WORKSPACE:
      const newState = { ...state };
      delete newState[action.workspaceId];
      return newState;
    default:
      return state;
  }
}
