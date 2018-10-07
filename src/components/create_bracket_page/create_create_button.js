import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import * as Create from "../../modules/actions/createBracketPageActions";

class CreateCreateButton extends Component {
  createBracket(brktInfo, brktName, playerNames, history, event) {
    const brktKey = Create.addBrkt(brktInfo, brktName, playerNames);
    history.push(`/TBG/update?brkt=${brktKey}`);
  }

  render() {
    const {
      brktInfo,
      brktName,
      noOfPlayers,
      playerNames
    } = this.props.createBracket;

    const { history } = this.props;
    return (
      <div>
        {noOfPlayers > 1 ? (
          <button
            className="btn btn-primary button"
            id="createBtn"
            type="submit"
            onClick={this.createBracket.bind(
              this,
              brktInfo,
              brktName,
              playerNames,
              history
            )}
          >
            Create Bracket
          </button>
        ) : (
          <button className="btn button" id="createBtn" disabled>
            Create Bracket
          </button>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    createBracket: state.createBracket
  };
}

export default withRouter(connect(mapStateToProps)(CreateCreateButton));
