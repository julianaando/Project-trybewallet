import React from 'react';
import { screen, within } from '@testing-library/react';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa o componente <WalletForm />', () => {
  it('Testa se o input Categoria seleciona opções', async () => {
    renderWithRedux(<WalletForm />);
    const select = await screen.findByTestId('tag-input');
    expect(within(select).getByText('Alimentação')).toBeInTheDocument();
    expect(within(select).getByText('Lazer')).toBeInTheDocument();
  });
  it('Testa se o input Método de pagamento seleciona opções', async () => {
    renderWithRedux(<WalletForm />);
    const select = await screen.findByTestId('method-input');
    const dinheiro = within(select).getByText('Dinheiro');
    expect(dinheiro).toBeInTheDocument();
  });
  it('Testa se o input Valor está renderizado na tela', async () => {
    renderWithRedux(<WalletForm />);
    const input = await screen.findByTestId('value-input');
    expect(input).toBeInTheDocument();
  });
  it('Testa se o input Descrição está renderizado na tela', async () => {
    renderWithRedux(<WalletForm />);
    const input = await screen.findByTestId('description-input');
    expect(input).toBeInTheDocument();
  });
  it('Testa se o botão de adicionar despesa está renderizado na tela', async () => {
    renderWithRedux(<WalletForm />);
    const buttonAdd = await screen.findByTestId('submit-btn');
    expect(buttonAdd).toBeInTheDocument();
  });
  it('Testa se o input Moeda está renderizado na tela', async () => {
    renderWithRedux(<WalletForm />);
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
});
