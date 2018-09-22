import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as Update from "../../modules/actions/updateBracketPageActions";

class UpdateMatch extends Component {
  updateNumber(matchNo, playerNo, match, event) {
    const {
      dispatch,
      updateBracket,
      updateBracket: { playerNames, heats }
    } = this.props;
    const path = window.location.search;
    const pathArr = path.split("=");
    const brktKey = pathArr[pathArr.length - 1];
    dispatch(
      Update.updatePoints(
        match,
        matchNo,
        playerNo,
        event.target.value,
        playerNames,
        brktKey
      )
    );

    if (match.player1Points && match.player2Points) {
      const heatInfo = _.find(heats, { heat: match.heat });
      const seedsArr = _.flatMap(heatInfo.matches, matchNo => {
        const newArr = [];
        newArr.push(updateBracket.matches[`match${matchNo}`].player1seed);
        newArr.push(updateBracket.matches[`match${matchNo}`].player2seed);
        return newArr;
      });

      dispatch(
        Update.winnerLoser(match, matchNo, playerNames, seedsArr, brktKey)
      );
    }
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
      player2Points,
      player1Edit,
      player2Edit
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
            {player1Edit ? (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 1, matchObj)}
                value={+player1Points}
              />
            ) : (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 1, matchObj)}
                value={+player1Points}
                readOnly
              />
            )}
          </div>
          <div className="play2Points">
            {player2Edit ? (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 2, matchObj)}
                value={+player2Points}
              />
            ) : (
              <input
                className="pointsInput form-control"
                type="number"
                onChange={this.updateNumber.bind(this, match, 2, matchObj)}
                value={+player2Points}
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
    createBracket: state.createBracket,
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(UpdateMatch);
