import { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AppContainerPage from "./Pages/AppContainerPage/AppContainer.page";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route
              path={["/home", "/edit/:id", "/new", "/details/:id"]}
              component={AppContainerPage}
            />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
