import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import StockCardList from "../../Components/StockCardList/StockCardList";
import "./Home.css";
// import { connect } from "react-redux";
// import { fetchAllItems } from "../../redux/actions/ItemActions";
import { PropTypes } from "prop-types";
import jwt_decode from "jwt-decode";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.props.fetchAllItems();
    }
  }

  handleLogout = () => {
    this.props.logout(this.props.history);
    this.props.resetItems();
  };

  render() {
    const allItems = this.props.allItems;
    if (allItems.loading) {
      return <div>Loading........</div>;
    } else {
      return (
        <>
          <h1 className="title">STOCK MANAGER</h1>
          <div className="main">
            <div className="btn1">
              <Link to="/new">
                <Button>New Stock</Button>
              </Link>
            </div>
            <div className="stock-list">
              <StockCardList items={allItems.items} />
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
Home.propTypes = {
  fetchAllItems: PropTypes.func,
  logout: PropTypes.func,
};
// const mapStateToProps = (state) => {
//   return {
//     allItems: state.allItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAllItems: () => dispatch(fetchAllItems()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;
