// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR, RECEIVED_CURRENCIES, IS_FETCHING, INCLUDE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  isFetching: false,
  expenses: [],
  total: 0,
  currency: '',
};

const reduceExpensesToTotal = (expenses) => expenses.reduce(
  (acc, cur) => acc + cur.exchangeRates[cur.currency].ask * cur.value,
  0,
);
export default function (state = initialState, action) {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: action.bool };
  case ERROR:
    return { ...state, error: action.error };
  case RECEIVED_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case INCLUDE_EXPENSE: {
    const newExpenses = [...state.expenses, action.expense];
    return { ...state, expenses: newExpenses, total: reduceExpensesToTotal(newExpenses) };
  }
  default:
    return state;
  }
}
