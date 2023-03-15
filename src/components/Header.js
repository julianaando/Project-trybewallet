import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/header.css';

class Header extends Component {
  shouldComponentUpdate(prevState) {
    const { total } = this.props;
    return (prevState.total !== total);
  }

  render() {
    const { email, total } = this.props;
    return (
      <div>
        <header className="principal">
          <h1>TrybeWallet</h1>
          <span data-testid="email-field">{email}</span>
          <h3>Despesa Total:</h3>
          <span data-testid="total-field">{total.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.wallet,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
