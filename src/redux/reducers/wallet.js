import { REQUEST_KEYS_SUCCESSFUL, REQUEST_KEYS_FAILED, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  nextId: 0,
  total: 0,
  currencies: [],
  error: '',
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  // editor: false, // valor booleano que indica de uma despesa está sendo editada
  // idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_KEYS_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case REQUEST_KEYS_FAILED:
    return {
      ...state,
      error: action.payload.error,
    };
  case ADD_EXPENSE: {
    const { value } = action.payload;
    const { ask } = action.payload.exchangeRates[action.payload.currency];
    return {
      ...state,
      total: state.total + parseFloat(value) * parseFloat(ask),
      nextId: state.nextId + 1,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: state.nextId,
        },
      ],
    };
  }

  default:
    return state;
  }
};

export default wallet;
