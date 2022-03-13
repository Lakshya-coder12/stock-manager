import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage/Home.page";
import NewItemPage from "../NewItemPage/NewItem.page";
import EditItemPage from "../EditItemPage/EditItem.page";
import ItemDetailsPage from "../ItemDetailsPage/ItemDetails.page";
import "./AppContainer.page.css";

class AppContainerPage extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/home" exact component={HomePage} />
          <Route path="/new" exact component={NewItemPage} />
          <Route path="/edit/:id" exact component={EditItemPage} />
          <Route path="/details/:id" exact component={ItemDetailsPage} />
        </Switch>
      </div>
    );
  }
}

export default AppContainerPage;
