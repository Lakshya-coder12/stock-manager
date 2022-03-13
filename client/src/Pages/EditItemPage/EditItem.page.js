import React, { Component } from "react";
import Button from "../../Components/Button/Button";

class EditItemPage extends Component {
  render() {
    return (
      <form className="form">
        <div className="input-element">
          <label className="label">Name</label>
          <input className="input" type="text" />
        </div>
        <div className="input-element">
          <label className="label">Company Name</label>
          <input className="input" type="text" />
        </div>
        <div className="input-element">
          <label className="label">Stock</label>
          <input className="input" type="number" step={1} />
        </div>
        <div className="form-btn">
          <Button>Update Item</Button>
        </div>
      </form>
    );
  }
}

export default EditItemPage;
