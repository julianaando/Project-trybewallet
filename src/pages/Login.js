import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    // TODO: salvar no state global usando o reducer
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
      break;
    }
  };

  render() {
    const { email, password, isEmailValid, isPasswordValid } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            required
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
            required
          />
        </label>

        <button type="submit" disabled={ !isEmailValid || !isPasswordValid }>
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
