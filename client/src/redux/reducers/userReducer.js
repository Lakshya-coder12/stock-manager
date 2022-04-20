import { FETCH_USER_SUCCESS, REMOVE_USER } from "../actions/ActionTypes";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      const userData = action.payload;
      return {
        user: userData,
      };
    case REMOVE_USER:
      return {
        user: {},
      };
    default:
      return { ...state };
  }
};

export default userReducer;
