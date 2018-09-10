import React, { Component } from "react";
import { connect } from "react-redux";
import * as Update from "../../modules/actions/updateBracketPageActions";

class UpdateMatch extends Component {
  updateNumber(matchNo, playerNo, match, event) {
    const path = window.location.search;
    const pathArr = path.split("=");
    const brktKey = pathArr[pathArr.length - 1];
    this.props.dispatch(
      Update.updatePoints(match, matchNo, playerNo, event.target.value, brktKey)
    );
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
      player1Points,
      player2Points
    } = this.props.data;

    const matchStyle = {
      top: yLoc,
      left: xLoc,
      width: width,
      height: height
    };

    const matchObj = this.props.data;
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
            <input
              className="pointsInput"
              type="number"
              min="2"
              max="256"
              onChange={this.updateNumber.bind(this, match, 1, matchObj)}
              defaultValue={player1Points ? player1Points : ""}
            />
          </div>
          <div className="play2Points">
            <input
              className="pointsInput"
              type="number"
              min="2"
              max="256"
              onChange={this.updateNumber.bind(this, match, 2, matchObj)}
              defaultValue={player2Points ? player2Points : ""}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    createBracket: state.createBracket
  };
}

export default connect(mapStateToProps)(UpdateMatch);
