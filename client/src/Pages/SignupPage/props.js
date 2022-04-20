import { signup } from "../../redux/actions/UserActions";

const mapDispatchToProps = (dispatch) => ({
  signup: (userData, history) => dispatch(signup(userData, history)),
});

export { mapDispatchToProps };
