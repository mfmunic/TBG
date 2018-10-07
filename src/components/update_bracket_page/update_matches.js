import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as Update from "../../modules/actions/updateBracketPageActions";
import * as Single from "../../modules/actions/singleElim/updateSingleElimActions";
import { brktRef } from "../../config/firebase";

class UpdateMatch extends Component {
  updateNumber(matchNo, playerNo, match, event) {
    const path = window.location.search;
    const pathArr = path.split("=");
    const brktKey = pathArr[pathArr.length - 1];
    const updatedObject = Single.updatePoints(
      match,
      matchNo,
      playerNo,
      event.target.value,
      brktKey,
      this.props.updateBracket.matches
    );

    brktRef.update(updatedObject, function(error) {
      if (error) {
        console.log("Error updating data:", error);
      }
    });
  }

  render() {
    const {
      yLoc,
      xLoc,
      width,
      height,
      match,
      player1Name,
      player2Name,
      player1Edit,
      player2Edit
    } = this.props.data;

    let { player1Points, player2Points } = this.props.data;

    const matchStyle = {
      top: yLoc,
      left: xLoc,
      width: width,
      height: height
    };

    const matchObj = this.props.data;

    player1Points === undefined
      ? (player1Points = "")
      : (player1Points = +player1Points);

    player2Points === undefined
      ? (player2Points = "")
      : (player2Points = +player2Points);

    return (
      <div className="match" id={`match${match}`} style={matchStyle}>
        <div className="matchLabel">
          <div className="matchUpdate">Match {match}</div>
          <div className="pointsUpdateLabel">Points</div>
        </div>
        <div className="players">
          <div className="play1">{player1Name}</div>
          <div className="play2">{player2Name}</div>
        </div>
        <div className="pointsUpdate">
          <div className="play1Points">
            {player1Name ? (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 1, matchObj)}
                value={player1Points}
              />
            ) : (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 1, matchObj)}
                value={player1Points}
                readOnly
              />
            )}
          </div>
          <div className="play2Points">
            {player2Name ? (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 2, matchObj)}
                value={player2Points}
              />
            ) : (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 2, matchObj)}
                value={player2Points}
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(UpdateMatch);
