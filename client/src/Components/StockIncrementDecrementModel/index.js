import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./props";
import StockIncrementDecrementModal from "./StockIncrementDecrementModal";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockIncrementDecrementModal);
