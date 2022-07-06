import {
  fetchUsers,
  fetchUser,
  addUser,
  fetchThings,
  addThing,
  fetchUserThings,
  deleteUser,
  fetchThingUser,
  deleteThing,
  deleteUserThing,
  fetchUnownedThings,
  updateThing,
} from "../../api";

export const setUsers = () => {
  return async (dispatch) => {
    const response = await fetchUsers();
    dispatch({
      type: "SET_USERS",
      users: response.data,
    });
  };
};

export const unownedThingsAction = () => {
  return async (dispatch) => {
    const response = await fetchUnownedThings();
    dispatch({
      type: "SET_UNOWNED_THINGS",
      unownedThings: response.data,
    });
  };
};

export const deleteUserAction = (user) => {
  return async (dispatch) => {
    const response = await deleteUser(user);
    dispatch({
      type: "DEL_USER",
      user: response.data,
    });
  };
};

export const deleteThingAction = (thing) => {
  return async (dispatch) => {
    const response = await deleteThing(thing);
    dispatch({
      type: "DEL_THING",
      thing: response.data,
    });
  };
};

export const addUserAction = (user) => {
  return async (dispatch) => {
    addUser(user);
  };
};

export const setThings = () => {
  return async (dispatch) => {
    const response = await fetchThings();
    dispatch({
      type: "SET_THINGS",
      things: response.data,
    });
  };
};

export const addThingAction = (thing) => {
  return async (dispatch) => {
    addThing(thing);
  };
};

export const setUser = (userId) => {
  return async (dispatch) => {
    const response = await fetchUser(userId);
    dispatch({
      type: "SET_USER",
      user: response.data,
    });
  };
};

export const setUserThings = (userId) => {
  return async (dispatch) => {
    const response = await fetchUserThings(userId);
    dispatch({
      type: "SET_USER_THINGS",
      userThings: response.data,
    });
  };
};

export const addUserThingAction = (thingId, params) => {
  return async (dispatch) => {
    await updateThing(thingId, params);
  };
};

export const setThingUsers = (thingId) => {
  return async (dispatch) => {
    const response = await fetchThingUser(thingId);
    dispatch({
      type: "SET_THING_USER",
      thingUsers: response.data,
    });
  };
};

export const addUserThing = (thing) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER_THING",
      payload: thing,
    });
  };
};

export const deleteUserThingAction = (userId, thingId) => {
  return async (dispatch) => {
    const response = await deleteUserThing(userId, thingId);
    dispatch({
      type: "DEL_USER_THING",
      userThing: response.data,
    });
  };
};

export const emptyUserThing = () => {
  return (dispatch) => {
    dispatch({
      type: "EMPTY_USER_THING",
    });
  };
};

export const emptyThingUser = () => {
  return (dispatch) => {
    dispatch({
      type: "EMPTY_THING_USER",
    });
  };
};
