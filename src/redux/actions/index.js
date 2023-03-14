export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

function requestSuccessful(data) { // função que cria a action, caso a requisição seja bem sucedida
  const currencies = Object.keys(data);
  currencies.splice(currencies.indexOf('USDT'), 1);
  return {
    type: REQUEST_SUCCESSFUL, // tipo da action
    payload: {
      currencies, // cria o array contendo as chaves do objeto data (moedas)
    },
  };
}

function requestFailed(error) { // função que cria a action, caso a requisição falhe
  return {
    type: REQUEST_FAILED, // tipo da action
    payload: error, // retorna o erro da requisição da API
  };
}

export function fetchAPICoins() { // função que faz a requisição da API
  return async (dispatch) => { // usando async e await, pois é assíncrono e retorna uma promise
    try { // tenta fazer a requisição
      const response = await fetch('https://economia.awesomeapi.com.br/json/all'); // faz a requisição
      const data = await response.json(); // transforma a resposta em json
      dispatch(requestSuccessful(data)); // se a requisição for bem sucedida, chama a função que cria a action
    } catch (error) { // se a requisição falhar, chama a função que cria a action
      dispatch(requestFailed(error)); // passando o erro como parâmetro
    }
  };
}
