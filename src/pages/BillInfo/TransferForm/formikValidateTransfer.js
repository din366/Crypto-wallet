const validateBill = (bill) => {

  if (!bill) return 'Выберите номер счета';
  if (bill.length < 10) return 'Длина счета должна быть не менее 10 символов';
  if (!Number.isFinite(+bill)) return 'Выберите корректный номер счета';
  return null;
};

const validateAmount = (amount) => {
  if (!amount || amount <= 0) return 'Введите корректную сумму';
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