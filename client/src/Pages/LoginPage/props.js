import { login } from "../../redux/actions/UserActions";

const mapDispatchToProps = (dispatch) => ({
  login: (userData, history) => dispatch(login(userData, history)),
});

export { mapDispatchToProps };
