import { incrementDecrementStock } from "../../redux/actions/ItemActions";

const mapStateToProps = (state) => {
  return {
    item: state.singleItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementDecrementStock: (id, factor) =>
      dispatch(incrementDecrementStock(id, factor)),
  };
};

export { mapStateToProps, mapDispatchToProps };
