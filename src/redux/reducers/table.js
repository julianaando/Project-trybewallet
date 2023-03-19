import { DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  ...state,
};

const table = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id,
      ),
    };

  default:
    return state;
  }
};

export default table;
