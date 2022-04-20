import {
  deleteItem,
  fetchSingleItem,
  removeSingleItem,
} from "../../redux/actions/ItemActions";

import { logout } from "../../redux/actions/UserActions";

const mapStateToProps = (state) => {
  return {
    item: state.singleItem,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleItem: (id) => dispatch(fetchSingleItem(id)),
    removeSingleItem: () => dispatch(removeSingleItem()),
    deleteItem: (id, history) => dispatch(deleteItem(id, history)),
    logout: (history) => dispatch(logout(history)),
  };
};

export { mapStateToProps, mapDispatchToProps };
