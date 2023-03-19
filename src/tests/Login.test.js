import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('Testa o componente <Login />', () => {
  it('Testa se os inputs de email, senha e botão estão renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Senha/i);
    const submitButton = screen.getByRole('button');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it('Testa se o botão de login está desabilitado quando os campos de email e senha não estão preenchidos', () => {
    renderWithRouterAndRedux(<Login />);
    const submitButton = screen.getByTestId('login-submit-btn');
    expect(submitButton).toBeDisabled();
  });
  it('Testa se o botão de login está habilitado quando os campos de email e senha estão preenchidos', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'juju_ando@hotmail.com');
    userEvent.type(passwordInput, '1234567');
    expect(submitButton).toBeEnabled();
  });
  it('Testa se o botão de login redireciona para a página de carteira', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'juju_ando@email.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const { user:
       { email },
    } = store.getState();
    expect(email).toBe('juju_ando@email.com');
  });
});
