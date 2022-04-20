import Home from "./Home";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./props";

export default connect(mapStateToProps, mapDispatchToProps)(Home);
