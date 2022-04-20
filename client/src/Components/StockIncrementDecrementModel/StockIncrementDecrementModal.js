import React, { Component } from "react";
import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import "./StockIncrementDecrementModel.css";
import { ButtonGroup } from "@mui/material";
// import { connect } from "react-redux";
// import { incrementDecrementStock } from "../../redux/actions/ItemActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

class StockIncrementDecrementModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      initialStock: 0,
    };
  }

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    if (this.state.counter > 0) {
      this.setState((state) => ({ counter: state.counter - 1 }));
    } else {
      toast.error("Stock value cannot go below zero.", { draggable: false });
    }
  };

  handleChange = (e) => {
    if (parseInt(e.target.value) > 0) {
      this.setState({ counter: parseInt(e.target.value) });
    } else {
      this.setState({ counter: 0 });
    }
  };

  handleClose = () => {
    this.props.onClose();
  };
  handleSave = () => {
    const factor = this.state.counter - this.state.initialStock;
    const token = localStorage.getItem("jwt");
    if (!token) {
      this.props.history.push("/login");
    }
    this.props.incrementDecrementStock(this.props.id, factor);
    this.setState({
      initialStock: this.state.counter,
    });
    this.handleClose();
  };
  componentDidMount() {
    this.setState({
      counter: this.props.stock,
      initialStock: this.props.stock,
    });
  }
  render() {
    const displayCounter = this.state.counter >= 0;
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <div className="model">
          <div className="group">
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={this.handleIncrement}>+</Button>
              <input
                className="model-input"
                value={this.state.counter}
                onChange={this.handleChange}
              />
              {displayCounter && (
                <Button onClick={this.handleDecrement}>-</Button>
              )}
            </ButtonGroup>
            <Button variant="contained" onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

StockIncrementDecrementModal.propTypes = {
  incrementDecrementStock: PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {
//     item: state.singleItem,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     incrementDecrementStock: (id, factor) =>
//       dispatch(incrementDecrementStock(id, factor)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(StockIncrementDecrementModal);

export default StockIncrementDecrementModal;
