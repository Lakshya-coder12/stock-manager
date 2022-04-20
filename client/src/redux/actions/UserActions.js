import axios from "axios";
import { FETCH_USER_SUCCESS, REMOVE_USER } from "./ActionTypes";
import { toast } from "react-toastify";

const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signup = (userData, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/auth/signup", userData)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        dispatch(fetchUserSuccess(res.data));
        history.push("/home");
      })
      .catch((err) => {
        // console.log(err.response.data);
        toast.error(err.response.data, { draggable: false });
      });
  };
};

export const login = (userData, history) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/auth/login", userData)
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        dispatch(fetchUserSuccess(res.data));
        history.push("/home");
      })
      .catch((err) => {
        // console.log(err.response.data);
        toast.error(err.response.data, { draggable: false });
      });
  };
};

export const logout = (history) => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch(removeUser());
    history.push("/login");
  };
};
