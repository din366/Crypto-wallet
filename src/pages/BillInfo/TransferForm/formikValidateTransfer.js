const validateBill = (bill) => {
  if (!bill) return 'Введите номер счета для перевода';
  if (bill.length < 10) return 'Длина счета должна быть не менее 10 символов';
  if (!Number.isFinite(+bill)) return 'Введите корректный номер счета';
  return null;
};

const validateAmount = (amount) => {
  if (!amount) return 'Введите корректную сумму';
  if (!Number.isFinite(+amount)) return 'Введите корректную сумму';
  return null;
};

export const validate = async (bill, amount) => {
  const errors = {};
  const billError = validateBill(bill);
  const amountError = validateAmount(amount);

  if (!bill && !amount) {
    errors.bill = 'Заполните поля для входа';
  } else {
    if (billError) errors.bill = billError;
    if (amountError) errors.amount = amountError;
  }

  return errors;
};