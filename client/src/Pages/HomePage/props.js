import { fetchAllItems } from "../../redux/actions/ItemActions";
import { logout } from "../../redux/actions/UserActions";
import { resetItems } from "../../redux/actions/ItemActions";
const mapStateToProps = (state) => {
  return {
    allItems: state.allItems,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllItems: () => dispatch(fetchAllItems()),
    logout: (history) => dispatch(logout(history)),
    resetItems: () => dispatch(resetItems()),
  };
};

export { mapStateToProps, mapDispatchToProps };
