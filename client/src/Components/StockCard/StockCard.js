import React, { Component } from "react";
import "./StockCard.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

class StockCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-title">{this.props.title}</div>
        <div className="info">
          <div className="companyName">{this.props.companyName}</div>
          <Link to={`/details/${this.props.id}`}>
            <Button>More Details</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default StockCard;
