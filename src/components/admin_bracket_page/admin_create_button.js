import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AdminCreateButton extends Component {
  goToCreate(history, event) {
    this.props.history.push("/TBG/create");
  }

  render() {
    const { history } = this.props;
    return (
      <button
        className="btn btn-primary button adminHeaderButton"
        onClick={this.goToCreate.bind(this, history)}
      >
        Create Tournament
      </button>
    );
  }
}

export default withRouter(AdminCreateButton);
