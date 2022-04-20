import {
  fetchSingleItem,
  removeSingleItem,
  updateItem,
} from "../../redux/actions/ItemActions";
import { logout } from "../../redux/actions/UserActions";

const mapStateToProps = (state) => {
  return {
    singleItem: state.singleItem,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleItem: (id) => dispatch(fetchSingleItem(id)),
    updateItem: (id, data, history) => dispatch(updateItem(id, data, history)),
    removeSingleItem: () => dispatch(removeSingleItem()),
    logout: (history) => dispatch(logout(history)),
  };
};

export { mapStateToProps, mapDispatchToProps };
