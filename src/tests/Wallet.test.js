import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa o componente <WalletForm />', () => {
  it('Testa se o input Categoria seleciona opções', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const select = await screen.findByTestId('tag-input');
    expect(within(select).getByText('Alimentação')).toBeInTheDocument();
    expect(within(select).getByText('Lazer')).toBeInTheDocument();
  });
  it('Testa se o input Método de pagamento seleciona opções', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const select = await screen.findByTestId('method-input');
    const dinheiro = within(select).getByText('Dinheiro');
    expect(dinheiro).toBeInTheDocument();
  });
  it('Testa se o input Valor está renderizado na tela', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = await screen.findByTestId('value-input');
    expect(input).toBeInTheDocument();
  });
  it('Testa se o input Descrição está renderizado na tela', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const input = await screen.findByTestId('description-input');
    expect(input).toBeInTheDocument();
    userEvent.type(input, 'Teste');
  });
  it('Testa se o botão de adicionar despesa está renderizado na tela', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const buttonAdd = await screen.findByTestId('submit-btn');
    expect(buttonAdd).toBeInTheDocument();
    userEvent.click(buttonAdd);
  });
  it('Testa se o input Moeda está renderizado na tela', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const select = await screen.findByTestId('currency-input');
    expect(select).toBeInTheDocument();
  });
  it('Testa se a chamada para a fetch da API foi realizada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testa se, caso a API retorne erro, o state com o erro é alterado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockRejectedValue(new Error('Erro')),
    });
    renderWithRouterAndRedux(<Wallet />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testa se uma nova expense é adicionada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />);
    
    const description = await screen.findByTestId('description-input');
    userEvent.type(description, 'Teste');

    const value = await screen.findByTestId('value-input');
    userEvent.type(value, '10');

    const button = await screen.findByTestId('submit-btn');
    userEvent.click(button);
  });
});
