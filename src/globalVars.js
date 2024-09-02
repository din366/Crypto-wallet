export const MAIN_URL = 'http://localhost:3000/';
export const LOGIN_URL = MAIN_URL + 'login';
export const CURRENCY_URL = MAIN_URL + 'currencies';
export const ACCOUNT_CURRENCY = MAIN_URL + 'accounts';
export const CREATE_ACCOUNT = MAIN_URL + 'create-account';

export const getAccountIdData = (id) => MAIN_URL + `account/${id}`;