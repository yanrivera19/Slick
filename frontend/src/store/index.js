import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import workspaceReducer from "./workspaces";
import channelReducer from "./channels";
import directMessageReducer from "./directMessages";
import userReducer from "./user";
import messageReducer from "./messages";

const rootReducer = combineReducers({
  session: sessionReducer,
  workspaces: workspaceReducer,
  channels: channelReducer,
  directMessages: directMessageReducer,
  messages: messageReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
