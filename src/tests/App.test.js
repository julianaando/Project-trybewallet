import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

// const loginFunction = () => {
//   userEvent.type(emailInput, emailJu);
//   userEvent.type(passwordInput, passwordJu);
//   userEvent.click(submitButton);
// };

describe('Testa o componente <App.js />', () => {
  it('Testa se a página principal é renderizada', () => {
    renderWithRouterAndRedux(<App />);
    const login = screen.getByText(/Entrar/i);
    expect(login).toBeInTheDocument();
  });
  it('Testa se o componente <Header /> é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));
    const header = screen.getByText(/TrybeWallet/i);
    expect(header).toBeInTheDocument();
  });
  it('Testa se o componente <WalletForm /> é renderizado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/carteira'));
    const form = await screen.findByTestId('form-expense');
    expect(form).toBeInTheDocument();
  });
  it('Testa se o componente <Table /> é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/tabela'));
    const table = screen.findByTestId('div-table');
    waitFor(() => expect(table).toBeInTheDocument());
  });
  it('Testa se o botão de adicionar despesa redireciona para a página de tabela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/tabela'));
    expect(history.location.pathname).toBe('/tabela');
  });
});
