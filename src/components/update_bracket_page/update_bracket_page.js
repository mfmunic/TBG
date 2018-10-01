import React, { Component } from "react";
import { connect } from "react-redux";

import UpdateHeader from "./update_header";
import UpdateBracketWindow from "./update_bracket_window";
import UpdateSidebar from "./update_sidebar";
import * as Update from "../../modules/actions/updateBracketPageActions";
import { brktRef } from "../../config/firebase";

class BrktUpdate extends Component {
  componentDidMount() {
    const path = window.location.search;
    const pathArr = path.split("=");
    const brktKey = pathArr[pathArr.length - 1];
    brktRef
      .child("tests")
      .child(brktKey)
      .on("value", snapshot =>
        this.props.dispatch(Update.updateBrkt(snapshot.val(), brktKey))
      );
  }

  componentWillUnmount() {
    const brktKey = this.props.updateBracket.brktKey;

    brktRef
      .child("tests")
      .child(brktKey)
      .off();
  }

  render() {
    const { brktKey } = this.props.updateBracket;
    return (
      <div className="adminPg">
        <UpdateHeader />
        {brktKey ? (
          <div id="updateNotHeader">
            <UpdateSidebar />
            <UpdateBracketWindow />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateBracket: state.updateBracket
  };
}

export default connect(mapStateToProps)(BrktUpdate);
