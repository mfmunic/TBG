import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import CreateBracketPage from "./components/create_bracket_page/create_bracket_page";
import BrktAdmin from "./components/admin_bracket_page/admin_bracket_page";
import BrktUpdate from "./components/update_bracket_page/update_bracket_page";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/TBG/create"} component={CreateBracketPage} />
          <Route path={"/TBG/update"} component={BrktUpdate} />
          <Route exact path={"/TBG"} component={BrktAdmin} />
          <Redirect from="/" to={"/TBG"} />
        </Switch>
      </Router>
    );
  }
}

export default App;
