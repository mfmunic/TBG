import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AdminUpdateButton extends Component {
  goToUpdate(history, key, event) {
    this.props.history.push({
      pathname: "/TBG/update",
      search: `?brkt=${key}`
    });
  }

  render() {
    const { history } = this.props;
    const { brktKey } = this.props;
    return (
      <button
        className="btn btn-primary button"
        onClick={this.goToUpdate.bind(this, history, brktKey)}
      >
        Update
      </button>
    );
  }
}

export default withRouter(AdminUpdateButton);
