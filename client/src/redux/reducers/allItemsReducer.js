import {
  FETCH_ALL_ITEMS_REQUEST,
  FETCH_ALL_ITEMS_SUCCESS,
  INSERT_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  INCREMENT_DECREMENT_STOCK_SUCCESS,
  DELETE_ITEM_SUCCESS,
  FETCH_ALL_ITEMS_FAILURE,
  RESET_ITEMS,
} from "../actions/ActionTypes";

const initialState = {
  loading: false,
  items: [],
};

const allItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case FETCH_ALL_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case INSERT_ITEM_SUCCESS:
      let temp = [];
      temp = state.items;
      temp.push(action.payload);
      return {
        ...state,
        items: temp,
      };
    case RESET_ITEMS: {
      return {
        ...state,
        items: [],
      };
    }
    case DELETE_ITEM_SUCCESS:
      return { ...state };
    case UPDATE_ITEM_SUCCESS:
      return { ...state };
    case INCREMENT_DECREMENT_STOCK_SUCCESS:
      return { ...state };
    default:
      return { ...state };
  }
};

export default allItemsReducer;
