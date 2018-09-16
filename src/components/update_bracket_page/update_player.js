import React, { Component } from "react";
import { connect } from "react-redux";
// import * as Create from "../../modules/actions/createBracketPageActions";
// import Title from "../utils/title";
// import _ from "lodash";

class Player extends Component {
  render() {
    const { name, wins, pts } = this.props.playerData;
    return (
      <div className="playerStanding">
        <p>{name}</p>
        <p>
          {wins}/{pts}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(Player);
