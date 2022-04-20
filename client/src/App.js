import { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Pages/HomePage/index";
import NewItem from "./Pages/NewItemPage/index";
import EditItem from "./Pages/EditItemPage/index";
import ItemDetails from "./Pages/ItemDetailsPage/index";
import Signup from "./Pages/SignupPage/index";
import Login from "./Pages/LoginPage/index";
import "./App.css";
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact component={Home} />
            <Route path="/new" exact component={NewItem} />
            <Route path="/edit/:id" exact component={EditItem} />
            <Route path="/details/:id" exact component={ItemDetails} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

export default App;
