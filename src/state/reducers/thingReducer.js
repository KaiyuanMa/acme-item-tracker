const reducer = (state = { thing: {}, thingUsers: [] }, action) => {
  switch (action.type) {
    case "SET_THING":
      return { ...state, thing: action.thing };
    case "SET_THING_USER":
      return { ...state, thingUsers: action.thingUsers };
    case "EMPTY_THING_USER":
      return { ...state, thingUsers: [] };
    default:
      return state;
  }
};

export default reducer;
