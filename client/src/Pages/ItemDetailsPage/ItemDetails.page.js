import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./ItemDetails.page.css";

class ItemDetailsPage extends Component {
  render() {
    return (
      <div className="item-details">
        <div className="item">
          <div className="item-title">Name</div>
          <span className="value">Value</span>
        </div>
        <div className="item">
          <div className="item-title">Company Name</div>
          <span className="value">Value</span>
        </div>
        <div className="item">
          <div className="item-title">Stock</div>
          <span className="value">Value</span>
        </div>
        <div className="form-btn">
          <Link to="/edit/:id">
            <Button>Edit Item</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ItemDetailsPage;
