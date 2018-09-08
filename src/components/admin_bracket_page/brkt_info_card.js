import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Admin from '../../modules/actions/adminBracketPageActions';
import AdminUpdateButton from './admin_update_button';

class BrktInfoCard extends Component {
  deleteBracket(key, event) {
    this.props.dispatch(Admin.deleteBrkts(key));
  }

  render() {
    const own = this.props.data;
    return (
      <div className="card col-sm-12">
        <p>Total Players: {own.brktInfo.total}</p>
        <p>Name: {own.brktName}</p>
        <AdminUpdateButton brktKey={own.key} />
        <button
          className="btn btn-primary"
          onClick={this.deleteBracket.bind(this, own.key)}>
          Delete
        </button>
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
