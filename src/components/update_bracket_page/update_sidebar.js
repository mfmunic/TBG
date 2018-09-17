import React, { Component } from "react";
import { connect } from "react-redux";
// import * as Create from "../../modules/actions/createBracketPageActions";
import Title from "../utils/title";
import Standings from "./update_standings";
// import _ from 'lodash';

class UpdateSidebar extends Component {
  render() {
    return (
      <nav className="col-lg-2">
        <div className="updateSidebar">
          <div className="playerStandingTitle">
            <p>Position</p>
            <p>Name</p>
            <p>Points</p>
          </div>
          <Standings />
          <Title />
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(UpdateSidebar);
