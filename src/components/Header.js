import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header className="principal">
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{email}</span>
          <h3>Despesa Total:</h3>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
