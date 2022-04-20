import {
  FETCH_SINGLE_ITEM_REQUEST,
  FETCH_SINGLE_ITEM_SUCCESS,
  REMOVE_SINGLE_ITEM,
  SHOW_TOAST,
} from "../actions/ActionTypes";

import { toast } from "react-toastify";

const showMessage = (message) => {
  toast(message, {
    position: "top-left",
  });
};

const initialState = {
  loading: false,
  item: {},
};

const singleItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SINGLE_ITEM_SUCCESS:
      return {
        loading: false,
        item: action.payload,
      };
    case REMOVE_SINGLE_ITEM:
      return {
        loading: false,
        item: {},
      };
    case SHOW_TOAST:
      showMessage(action.payload);
      return { ...state };
    default:
      return { ...state };
  }
};

export default singleItemReducer;
