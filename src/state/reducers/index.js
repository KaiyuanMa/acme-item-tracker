import { combineReducers } from "redux";
import thingReducer from "./thingReducer";
import thingsReducer from "./thingsReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  user: userReducer,
  userThings: userReducer,
  users: usersReducer,
  unownedThings: usersReducer,
  thing: thingReducer,
  thingUsers: thingReducer,
  things: thingsReducer,
});

export default reducers;
