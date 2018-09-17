import React, { Component } from "react";
import { connect } from "react-redux";
// import * as Create from "../../modules/actions/createBracketPageActions";
import Player from "./update_player";
import _ from "lodash";

class Standings extends Component {
  render() {
    const { playerNames } = this.props.updateBracket;
    const sortedPlayerList = _.sortBy(playerNames, ["position"]);
    const playerList = _.map(sortedPlayerList, (player, index) => {
      return <Player key={index} playerData={player} />;
    });
    return <div className="standings">{playerList}</div>;
  }
}

function mapStateToProps(state) {
  return {
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(Standings);
