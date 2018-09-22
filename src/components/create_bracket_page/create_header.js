import React, { Component } from "react";
import { connect } from "react-redux";

import * as Create from "../../modules/actions/createBracketPageActions";

import CancelButton from "../utils/cancel_button";
import CreateCreateButton from "./create_create_button";

class CreateHeader extends Component {
  componentWillMount() {
    this.props.dispatch(Create.randomTorName());
  }
  updateBrktName(event) {
    if (event.target.value === "") {
      this.props.dispatch(Create.randomTorName());
    } else {
      this.props.dispatch(Create.updateTorName(event.target.value));
    }
  }

  render() {
    const { brktName } = this.props.createBracket;
    return (
      <div className="createHeader">
        <div id="torName">
          <p>Name:</p>
          <input
            // className="form-control"
            id="brktName"
            type="text"
            onChange={this.updateBrktName.bind(this)}
            placeholder={brktName}
          />
        </div>

        <div className="headerBtns">
          <CreateCreateButton />
          <CancelButton />
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

export default connect(mapStateToProps)(CreateHeader);
