const reducer = (state = { user: {}, userThings: [] }, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_USER_THINGS":
      return { ...state, userThings: action.userThings };
    case "ADD_USER_THING":
      return { ...state, userThings: [...state.userThings, action.userThings] };
    case "DEL_USER_THING":
      const newThing = state.userThings.filter(
        (userThing) => action.userThing != userThing
      );
      return {
        ...state,
        userThings: newThing,
      };
    case "EMPTY_USER_THING":
      return { ...state, userThings: [] };
    default:
      return state;
  }
};

export default reducer;
