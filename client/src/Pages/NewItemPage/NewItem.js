import React, { Component } from "react";
import "./NewItem.css";
import Button from "../../Components/Button/Button";
// import { connect } from "react-redux";
// import { insertItem } from "../../redux/actions/ItemActions";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

export class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      companyName: "",
      stock: 0,
      username: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    if (!token) {
      this.props.history.push("/login");
    } else {
      const user = jwt_decode(token);
      const username = user.user.name;
      this.setState({
        username: username,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleRedirect = () => {
    this.props.history.push("/home");
  };

  handleLogout = () => {
    this.props.logout(this.props.history);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      companyName: this.state.companyName,
      stock: this.state.stock,
    };
    this.props.insertItem(formData, this.props.history);
  };
  render() {
    const { name, companyName, stock } = this.state;
    return (
      <>
        <Button className="abs-button" onClick={this.handleRedirect}>
          Home
        </Button>
        <div className="form">
          <div className="input-element">
            <label className="label">Name</label>
            <input
              name="name"
              onChange={this.handleInputChange}
              value={this.state.name}
              className="input"
              type="text"
            />
          </div>
          <div className="input-element">
            <label className="label">Company Name</label>
            <input
              name="companyName"
              className="input"
              onChange={this.handleInputChange}
              value={this.state.companyName}
              type="text"
            />
          </div>
          <div className="input-element">
            <label className="label">Stock</label>
            <input
              name="stock"
              onChange={this.handleInputChange}
              value={this.state.stock}
              className="input"
              type="number"
              step={1}
            />
          </div>
          <div className="form-btn">
            <Button
              onClick={
                !stock || !companyName || !name ? null : this.handleSubmit
              }
              id="btn1"
            >
              Add Item
            </Button>
          </div>
        </div>
        <div className="logout">
          <span className="username">{this.state.username}</span>
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
      </>
    );
  }
}

NewItem.propTypes = {
  insertItem: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     insertItem: (data, history) => dispatch(insertItem(data, history)),
//   };
// };

// export default connect(null, mapDispatchToProps)(NewItemPage);

export default NewItem;
