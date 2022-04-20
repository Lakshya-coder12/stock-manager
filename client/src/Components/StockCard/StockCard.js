import React, { Component } from "react";
import "./StockCard.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import StockIncrementDecrementModal from "../StockIncrementDecrementModel/index";

class StockCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  handleClickOpen = () => {
    this.setState({
      isOpen: true,
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };
  render() {
    return (
      <div className="card">
        <div className="arrow">
          <Button onClick={this.handleClickOpen}>Inc/Dec Stock</Button>
        </div>
        <div className="card-title">{this.props.name}</div>
        <div className="info">
          <div className="companyName">{`Company: ${this.props.companyName}`}</div>
          <Link to={`/details/${this.props.id}`}>
            <Button>More Details</Button>
          </Link>
        </div>
        <StockIncrementDecrementModal
          stock={this.props.stock}
          id={this.props.id}
          open={this.state.isOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default StockCard;
