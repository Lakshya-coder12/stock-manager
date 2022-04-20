import ItemDetails from "./ItemDetails";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./props";

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
