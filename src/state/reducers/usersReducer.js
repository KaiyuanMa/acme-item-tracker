const reducer = (state = { users: [], unownedThings: [] }, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_UNOWNED_THINGS":
      return { ...state, unownedThings: action.unownedThings };
    case "DEL_USER":
      return {
        ...state,
        users: state.users.filter((user) => action.user != user),
      };
    default:
      return state;
  }
};

export default reducer;
