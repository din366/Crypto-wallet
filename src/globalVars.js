const isLocal = true;

export const MAIN_URL = isLocal ? 'http://localhost:3000/' : 'https://crypto-wallet-api-one.vercel.app/';
export const LOGIN_URL = MAIN_URL + 'login';
export const ACCOUNT_CURRENCY_FOR_EXCHANGE = MAIN_URL + 'currencies';
export const ACCOUNT_CURRENCY = MAIN_URL + 'accounts';
export const CREATE_ACCOUNT = MAIN_URL + 'create-account';
export const TRANSFER_FUNDS = MAIN_URL + 'transfer-funds';
export const CURRENCY_FEED = MAIN_URL + 'currency-feed';
export const COIN_EXCHANGE = MAIN_URL + 'currency-buy';

export const getAccountIdData = (id) => MAIN_URL + `account/${id}`;