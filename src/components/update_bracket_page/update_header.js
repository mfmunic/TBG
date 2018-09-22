import React, { Component } from "react";
import { connect } from "react-redux";

import CancelButton from "../utils/cancel_button";
// import AdminCreateButton from './admin_create_button';
// import Title from "../utils/title";

class UpdateHeader extends Component {
  render() {
    const { brktName } = this.props.updateBracket;
    return (
      <nav className="nav createHeader">
        <h1 className="updateBrktName">{brktName}</h1>
        <div className="headerBtns">
          <CancelButton />
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

export default connect(mapStateToProps)(UpdateHeader);
