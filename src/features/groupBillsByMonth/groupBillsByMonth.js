export const groupBillsByMonth = (transactions, accountId, lastMonthCount) => {
  let previousBalance = 0;
  const grouped = transactions.reduce((acc, transaction) => {
    const month = transaction.date.slice(0, 7); // Получаем год-месяц в формате YYYY-MM
    if (!acc[month]) {
      acc[month] = { name: month, count: previousBalance };
    }

    if (transaction.from === accountId) {
      acc[month].count -= Math.round(transaction.amount);
    } else {
      acc[month].count += Math.round(transaction.amount);
    }
    previousBalance = acc[month].count; // ? we write down the current account balance for use in the new month
    return acc;
  }, []);

  return Object.values(Object.values(grouped).slice(-lastMonthCount))
};