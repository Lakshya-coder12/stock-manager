import { combineReducers } from "redux";
import allItemsReducer from "./allItemsReducer";
import singleItemReducer from "./singleItemReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  allItems: allItemsReducer,
  singleItem: singleItemReducer,
  user: userReducer,
});

export default rootReducer;
