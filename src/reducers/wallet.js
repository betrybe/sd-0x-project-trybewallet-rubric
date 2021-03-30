// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR,
  RECEIVED_CURRENCIES,
  IS_FETCHING, INCLUDE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE_SWITCH,
  EDIT_EXPENSE } from '../actions';

const initialState = {
  currencies: {},
  isFetching: false,
  expenses: [],
  total: 0,
  currency: '',
  editing: undefined,
};

const reduceExpensesToTotal = (expenses) => expenses.reduce(
  (acc, cur) => acc + cur.exchangeRates[cur.currency].ask * cur.value,
  0,
);

const includeExpense = (action, state) => {
  action.expense.id = state.expenses.length;
  const newExpenses = [...state.expenses, action.expense];
  return { ...state, expenses: newExpenses, total: reduceExpensesToTotal(newExpenses) };
};

const editSwitch = (action, state) => (state.editing ? { ...state, editing: false }
  : { ...state, editing: state.expenses.find(({ id }) => action.id === id) });

const edit = (action, state) => {
  const expense = state.expenses.find(({ id }) => id === state.editing.id);
  const index = state.expenses.indexOf(expense);
  const left = state.expenses.slice('', index);
  const right = state.expenses.slice(index + 1);
  return { ...state,
    expenses: [...left, { ...action.expense, id: state.editing.id }, ...right],
  };
};
export default function (state = initialState, action) {
  switch (action.type) {
  case IS_FETCHING:
    return { ...state, isFetching: action.bool };
  case ERROR:
    return { ...state, error: action.error };
  case RECEIVED_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case INCLUDE_EXPENSE:
    return includeExpense(action, state);
  case DELETE_EXPENSE:
    return { ...state, expenses: state.expenses.filter(({ id }) => id !== action.id) };
  case EDIT_EXPENSE_SWITCH:
    return editSwitch(action, state);
  case EDIT_EXPENSE:
    return edit(action, state);
  default:
    return state;
  }
}
