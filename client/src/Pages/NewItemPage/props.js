import { insertItem } from "../../redux/actions/ItemActions";
import { logout } from "../../redux/actions/UserActions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  insertItem: (data, history) => dispatch(insertItem(data, history)),
  logout: (history) => dispatch(logout(history)),
});

export { mapStateToProps, mapDispatchToProps };
