import React, { Component } from "react";
import { connect } from "react-redux";

import BrktsOwnedList from "./brkts_owned_list";
import AdminHeader from "./admin_header";
import * as Admin from "../../modules/actions/adminBracketPageActions";

class BrktAdmin extends Component {
  componentWillMount() {
    this.props.dispatch(Admin.fetchBrkts());
  }

  render() {
    return (
      <div className="adminPg">
        <AdminHeader />
        <BrktsOwnedList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    brktsOwned: state.brktsOwned
  };
}

export default connect(mapStateToProps)(BrktAdmin);
