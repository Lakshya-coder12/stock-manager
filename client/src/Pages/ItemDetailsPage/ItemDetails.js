import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./ItemDetails.css";
import moment from "moment";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import {
//   deleteItem,
//   fetchSingleItem,
//   removeSingleItem,
// } from "../../redux/actions/ItemActions";
import jwt_decode from "jwt-decode";

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }
  itemID = this.props.match.params;
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
    }
  }
  handleRedirect = () => {
    this.props.history.push("/home");
  };
  componentWillUnmount() {
    this.props.removeSingleItem();
  }

  handleLogout = () => {
    this.props.logout(this.props.history);
  };

  handleDeleteItem = () => {
    this.props.deleteItem(this.itemID.id, this.props.history);
  };
  render() {
    const { loading, item } = this.props.item;
    if (loading) {
      return <div>....loading</div>;
    } else {
      return (
        <>
          <Button className="abs-button" onClick={this.handleRedirect}>
            Home
          </Button>
          <div className="item-details">
            <div className="item">
              <div className="item-title">Name</div>

              <span className="value">{item && item.name}</span>
            </div>
            <div className="item">
              <div className="item-title">Company Name</div>
              <span className="value">{item && item.companyName}</span>
            </div>
            <div className="item">
              <div className="item-title">Stock</div>
              <span className="value">{item && item.stock}</span>
            </div>
            <div className="item">
              <div className="item-title">Date Created</div>
              <span className="value">
                {moment(item.dateCreated).toDate().toDateString()}
              </span>
            </div>
            <div className="form-btn">
              <Link to={`/edit/${this.itemID.id}`}>
                <Button>Edit Item</Button>
              </Link>
              <Button onClick={this.handleDeleteItem}>Delete Item</Button>
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
}

ItemDetails.propTypes = {
  fetchSingleItem: PropTypes.func,
  removeSingleItem: PropTypes.func,
  deleteItem: PropTypes.func,
  logout: PropTypes.func,
};

// const mapStateToProps = (state) => {
//   return {
//     item: state.singleItem,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSingleItem: (id) => dispatch(fetchSingleItem(id)),
//     removeSingleItem: () => dispatch(removeSingleItem()),
//     deleteItem: (id, history) => dispatch(deleteItem(id, history)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
export default ItemDetails;
