export const groupedTransactionsByMonth = (transactions ,month) => {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - month);

  if (currentDate.getMonth() < 6) {
    sixMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
  }

  return transactions.filter(item => {
    const date = new Date(item.date);
    return date >= sixMonthsAgo;
  }).sort((a, b) => {
    return Date.parse(a.date) - Date.parse(b.date);
  });
}