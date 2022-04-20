import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  // DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  FETCH_ALL_ITEMS_FAILURE,
  FETCH_ALL_ITEMS_REQUEST,
  FETCH_ALL_ITEMS_SUCCESS,
  // FETCH_SINGLE_ITEM_FAILURE,
  FETCH_SINGLE_ITEM_REQUEST,
  FETCH_SINGLE_ITEM_SUCCESS,
  // INCREMENT_DECREMENT_STOCK_FAILURE,
  INCREMENT_DECREMENT_STOCK_REQUEST,
  INCREMENT_DECREMENT_STOCK_SUCCESS,
  // INSERT_ITEM_FAILURE,
  INSERT_ITEM_SUCCESS,
  REMOVE_SINGLE_ITEM,
  RESET_ITEMS,
  // SHOW_TOAST,
  // UPDATE_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
} from "./ActionTypes";

// fetch all items
const fetchAllItemsRequest = () => {
  return {
    type: FETCH_ALL_ITEMS_REQUEST,
  };
};

const fetchAllItemsSuccess = (items) => {
  return {
    type: FETCH_ALL_ITEMS_SUCCESS,
    payload: items,
  };
};

const fetchAllItemsFailure = () => {
  return {
    type: FETCH_ALL_ITEMS_FAILURE,
  };
};

// fetch single item
const fetchSingleItemRequest = () => {
  return {
    type: FETCH_SINGLE_ITEM_REQUEST,
  };
};

const fetchSingleItemSuccess = (item) => {
  return {
    type: FETCH_SINGLE_ITEM_SUCCESS,
    payload: item,
  };
};

// const fetchSingleItemFailure = (error) => {
//   return {
//     type: FETCH_SINGLE_ITEM_FAILURE,
//     payload: error,
//   };
// };

export const removeSingleItem = () => {
  return {
    type: REMOVE_SINGLE_ITEM,
  };
};

const deleteItemSuccess = () => {
  return {
    type: DELETE_ITEM_SUCCESS,
  };
};

// const deleteItemFailure = (error) => {
//   return {
//     type: DELETE_ITEM_FAILURE,
//     payload: error,
//   };
// };

const insertItemSuccess = (item) => {
  return {
    type: INSERT_ITEM_SUCCESS,
    payload: item,
  };
};

// const insertItemFailure = (error) => {
//   return {
//     type: INSERT_ITEM_FAILURE,
//     payload: error,
//   };
// };

const updateItemSuccess = (acknowledgement) => {
  return {
    type: UPDATE_ITEM_SUCCESS,
    payload: acknowledgement,
  };
};

// const updateItemFailure = (error) => {
//   return {
//     type: UPDATE_ITEM_FAILURE,
//     payload: error,
//   };
// };

export const resetItems = () => {
  return {
    type: RESET_ITEMS,
  };
};

const incrementDecrementStockRequest = () => {
  return {
    type: INCREMENT_DECREMENT_STOCK_REQUEST,
  };
};

const incrementDecrementStockSuccess = (acknowledgement) => {
  return {
    type: INCREMENT_DECREMENT_STOCK_SUCCESS,
    payload: acknowledgement,
  };
};

// const incrementDecrementStockFailure = (error) => {
//   return {
//     type: INCREMENT_DECREMENT_STOCK_FAILURE,
//     payload: error.message,
//   };
// };

// const showToast = (message) => {
//   return {
//     type: SHOW_TOAST,
//     payload: message,
//   };
// };

export const fetchAllItems = () => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(fetchAllItemsRequest());
    axios
      .get("http://localhost:3001/items/fetchAllItems", config)
      .then((response) => {
        const items = response.data;
        dispatch(fetchAllItemsSuccess(items));
      })
      .catch((err) => {
        // const error = err.message;
        dispatch(fetchAllItemsFailure());
        toast.error("Items were not able to be fetched", { draggable: false });
      });
  };
};

export const fetchSingleItem = (id) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(fetchSingleItemRequest());
    axios
      .get(`http://localhost:3001/items/fetchOneItem/${id}`, config)
      .then((response) => {
        const item = response.data;
        dispatch(fetchSingleItemSuccess(item));
      })
      .catch((err) => {
        // const error = err.message;
        // dispatch(fetchSingleItemFailure(error));
        toast.error("Item was not able to be fetched", { draggable: false });
      });
  };
};

export const deleteItem = (id, history) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    axios
      .delete(`http://localhost:3001/items/deleteItem/${id}`, config)
      .then(() => {
        dispatch(deleteItemSuccess());
        history.push("/home");
        toast.success("Item deleted successfully", { draggable: false });
      })
      .catch((err) => {
        // const error = err.message;
        // dispatch(deleteItemFailure(error));
        toast.error("Item not deleted", { draggable: false });
      });
  };
};

export const insertItem = (data, history) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    axios
      .post("http://localhost:3001/items/postOneItem", data, config)
      .then((response) => {
        const item = response.data;
        dispatch(insertItemSuccess(item));
        history.push("/home");
        toast.success("Item inserted successfully", { draggable: false });
      })
      .catch((err) => {
        // const error = err.message;
        // dispatch(insertItemFailure(error));
        toast.error("Item not inserted", { draggable: false });
      });
  };
};

export const updateItem = (id, data, history) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    axios
      .patch(
        `http://localhost:3001/items/editItem/${id}?name=${data.name}&companyName=${data.companyName}&stock=${data.stock}`,
        {},
        config
      )
      .then((response) => {
        const acknowledgement = response.data;
        dispatch(updateItemSuccess(acknowledgement));
        history.push("/home");
        toast.success("Item updated successfully", { draggable: false });
      })
      .catch((err) => {
        // const error = err.message;
        // dispatch(updateItemFailure(error));
        toast.error("Item not updated", { draggable: false });
      });
  };
};

export const incrementDecrementStock = (id, factor) => {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return (dispatch) => {
    dispatch(incrementDecrementStockRequest());
    axios
      .patch(
        `http://localhost:3001/items/incrementOrDecrementStock/${id}/?stock=${factor}`,
        {},
        config
      )
      .then((response) => {
        const acknowledgement = response.acknowledgement;
        dispatch(incrementDecrementStockSuccess(acknowledgement));
        toast.success("Stock value incremented/decremented successfully", {
          draggable: false,
        });
        // dispatch(showToast("Stock value incremented/decremented successfully"));
      })
      .catch((err) => {
        // dispatch(incrementDecrementStockFailure(error));
        // dispatch(showToast("Stock value not updated"));
        toast.error("Stock value not updated", {
          draggable: false,
        });
      });
  };
};
