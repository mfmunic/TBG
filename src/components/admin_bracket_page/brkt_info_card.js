import React, { Component } from "react";
import { connect } from "react-redux";
import * as Admin from "../../modules/actions/adminBracketPageActions";
import AdminUpdateButton from "./admin_update_button";

class BrktInfoCard extends Component {
  deleteBracket(key, event) {
    this.props.dispatch(Admin.deleteBrkts(key));
  }

  render() {
    const own = this.props.data;
    return (
      <div className="card brktCard">
        <h3 className="cardBrktName">{own.brktName}</h3>
        <div className="cardInfo">
          <p>Total Players: {own.brktInfo.total}</p>
        </div>
        <div className="cardButtonHolder">
          <AdminUpdateButton brktKey={own.key} />
          <button
            className="btn btn-primary button"
            onClick={this.deleteBracket.bind(this, own.key)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    brktsOwned: state.brktsOwned
  };
}

export default connect(mapStateToProps)(BrktInfoCard);
