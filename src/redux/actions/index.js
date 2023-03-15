export const REQUEST_KEYS_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_KEYS_FAILED = 'REQUEST_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export function requestSuccessful(currencies) { // função que cria a action, caso a requisição seja bem sucedida
  return {
    type: REQUEST_KEYS_SUCCESSFUL, // tipo da action
    payload: {
      currencies, // cria o array contendo as chaves do objeto data (moedas)
    },
  };
}

export function requestFailed(error) { // função que cria a action, caso a requisição falhe
  return {
    type: REQUEST_KEYS_FAILED, // tipo da action
    payload: error, // retorna o erro da requisição da API
  };
}

export function addExpense(state, exchangeRates) { // cria a action que contém os dados da moeda escolhida
  const { value, currency, method, tag, description } = state;
  return {
    type: ADD_EXPENSE,
    payload: {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates, // objeto contendo as taxas de conversão
    },
  };
}

export function fetchAPICoins() { // função que faz a requisição da API
  return async (dispatch) => { // usando async e await, pois é assíncrono e retorna uma promise
    try { // tenta fazer a requisição
      const response = await fetch('https://economia.awesomeapi.com.br/json/all'); // faz a requisição
      const data = await response.json();// transforma a resposta em json
      const currencies = Object.keys(data);
      currencies.splice(currencies.indexOf('USDT'), 1);
      dispatch(requestSuccessful(currencies)); // se a requisição for bem sucedida, chama a função que cria a action
    } catch (error) { // se a requisição falhar, chama a função que cria a action
      dispatch(requestFailed(error)); // passando o erro como parâmetro
    }
  };
}
