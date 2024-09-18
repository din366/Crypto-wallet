const validateExchange = (active, other) => {
  if (!active) return 'Выберите счет';
  if (active.length < 3) return 'Длина не менее 3 символов';
  if (active === other) return 'Счета должны отличаться';
  return null;
};
const validateExchangeAmount = (amount) => {
  if (!amount || amount <= 0) return 'Введите корректную сумму';
  if (!Number.isFinite(+amount)) return 'Введите корректную сумму';
  return null;
};

export const validate = async (from, to, amount) => {

  const errors = {};

  const fromError = validateExchange(from, to);
  const toError = validateExchange(to, from);
  const amountError = validateExchangeAmount(amount);

  if (!from && !to) {
    errors.from = 'Заполните поля для входа';
  } else {
    if (fromError) errors.from = fromError;
    if (toError && toError!== fromError) errors.to = toError;
    if (amountError) errors.amount = amountError;
  }
  return errors;
};