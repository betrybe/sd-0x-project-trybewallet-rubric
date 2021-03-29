// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const loginAction = (login) => ({ type: LOGIN, payload: login });

export const GET_CURRENCIES = 'GET_CURRENCIES';

export const IS_FETCHING = 'IS_FETCHING';

const isFetching = (bool) => ({ type: IS_FETCHING, bool });

export const RECEIVED_CURRENCIES = 'RECEIVED_CURRENCIES';

export const receivedCurrenciesAction = (currencies) => (
  { type: RECEIVED_CURRENCIES, currencies });

export const ERROR = 'ERROR';

export const handleError = (error) => ({ type: ERROR, error });

export const getCurrenciesAction = () => (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  dispatch(isFetching(true));
  fetch(url).then(
    (response) => {
      dispatch(isFetching(false));
      response.json().then(
        (json) => {
          delete json.USDT;
          dispatch(receivedCurrenciesAction(json));
        },
      );
    },
    (error) => {
      dispatch(isFetching(false));
      dispatch(handleError(error));
    },
  );
};

export const INCLUDE_EXPENSE = 'INCLUDE_EXPENSE';

export const includeExpenseAction = (expense) => ({ type: INCLUDE_EXPENSE, expense });
