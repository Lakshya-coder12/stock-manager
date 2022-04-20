import React, { Component } from "react";
import Button from "../../Components/Button/Button";
// import { connect } from "react-redux";
// import {
//   fetchSingleItem,
//   removeSingleItem,
//   updateItem,
// } from "../../redux/actions/ItemActions";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.itemID = this.props.match.params;
    this.state = {
      name: "",
      companyName: "",
      stock: 0,
      username: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      companyName: this.state.companyName,
      stock: this.state.stock,
    };
    this.props.updateItem(this.itemID.id, data, this.props.history);
  };
  handleRedirect = () => {
    this.props.history.push("/home");
  };

  handleLogout = () => {
    this.props.logout(this.props.history);
  };

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
      this.props.fetchSingleItem(this.itemID.id);
      this.setState(this.props.singleItem.item);
    }
  }
  componentWillUnmount() {
    this.props.removeSingleItem();
  }
  render() {
    // const user = this.props.user.user;
    return (
      <>
        <Button className="abs-button" onClick={this.handleRedirect}>
          Home
        </Button>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="input-element">
            <label className="label">Name</label>
            <input
              required
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
              required
              name="companyName"
              onChange={this.handleInputChange}
              value={this.state.companyName}
              className="input"
              type="text"
            />
          </div>
          <div className="input-element">
            <label className="label">Stock</label>
            <input
              required
              name="stock"
              onChange={this.handleInputChange}
              value={this.state.stock}
              className="input"
              type="number"
              step={1}
            />
          </div>
          <div className="form-btn">
            <Button>Update Item</Button>
          </div>
        </form>
        <div className="logout">
          <span className="username">{this.state.username}</span>
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
      </>
    );
  }
}
EditItem.propTypes = {
  fetchSingleItem: PropTypes.func,
  updateItem: PropTypes.func,
  removeSingleItem: PropTypes.func,
  logout: PropTypes.func,
};
// const mapStateToProps = (state) => {
//   return {
//     singleItem: state.singleItem,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSingleItem: (id) => dispatch(fetchSingleItem(id)),
//     updateItem: (id, data, history) => dispatch(updateItem(id, data, history)),
//     removeSingleItem: () => dispatch(removeSingleItem()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
export default EditItem;
