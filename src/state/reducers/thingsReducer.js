const reducer = (state = { things: [] }, action) => {
  switch (action.type) {
    case "SET_THINGS":
      return { ...state, things: action.things };
    case "DEL_THING":
      return {
        ...state,
        things: state.things.filter((thing) => action.thing != thing),
      };
    default:
      return state;
  }
};

export default reducer;
