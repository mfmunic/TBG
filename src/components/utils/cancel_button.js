import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CancelButton extends Component {
  goToAdmin(history, event) {
    this.props.history.push("/TBG/admin");
  }

  render() {
    const { history } = this.props;
    return (
      <button
        className="btn btn-primary button"
        onClick={this.goToAdmin.bind(this, history)}
      >
        Cancel
      </button>
    );
  }
}

export default withRouter(CancelButton);
