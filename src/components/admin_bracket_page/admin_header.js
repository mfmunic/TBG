import React, { Component } from "react";
import { connect } from "react-redux";
import Title from "../utils/title";

import AdminCreateButton from "./admin_create_button";

class AdminHeader extends Component {
  render() {
    return (
      <nav className="nav adminHeader">
        <div className="titleHolder">
          <Title />
          <div className="adminHeaderButtonHolder">
            <AdminCreateButton />
          </div>
        </div>
        {/* <div className="adminHeaderButtonHolder">
        </div> */}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(AdminHeader);
