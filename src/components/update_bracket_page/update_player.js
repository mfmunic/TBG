import React, { Component } from "react";
import { connect } from "react-redux";
// import * as Create from "../../modules/actions/createBracketPageActions";
// import Title from "../utils/title";
// import _ from "lodash";

class Player extends Component {
  positionith(pos) {
    switch (+pos) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  render() {
    const { name, position, pts } = this.props.playerData;
    const posEnd = this.positionith(position);
    return (
      <div className="playerStanding">
        <p>
          {position}
          {posEnd}
        </p>
        <p>{name}</p>
        <p>{pts}</p>
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
