import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  };

  validateEmail = (email) => {
    const emailRegex = /^\w+@\w+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const six = 6;
    return password.length >= six;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch({ type: 'LOGIN', email });
    history.push('/carteira');
    this.setState({ email: '' });
    console.log(`Logged in with email: ${email}`);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
    case 'email':
      this.setState({
        [name]: value,
        isEmailValid: this.validateEmail(value),
      });
      break;
    case 'password':
      this.setState({
        [name]: value,
        isPasswordValid: this.validatePassword(value),
      });
      break;
    default:
      return null;
    }
  };

  render() {
    const { email, password, isEmailValid, isPasswordValid } = this.state;

    return (
      <form onSubmit={ this.handleSubmit } className="form">
        <input
          type="email"
          className="input"
          placeholder="Email"
          id="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
          required
        />
        <input
          type="password"
          className="input"
          id="password"
          placeholder="Senha"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ this.handleChange }
          required
        />

        <button
          type="submit"
          className="btn-login"
          data-testid="login-submit-btn"
          disabled={ !isEmailValid || !isPasswordValid }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(Login);
