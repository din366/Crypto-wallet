export const groupBillsByMonth = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const month = transaction.date.slice(0, 7); // Получаем год-месяц в формате YYYY-MM
    if (!acc[month]) {
      acc[month] = { name: month, count: 0 };
    }
    acc[month].count += Math.round(transaction.amount);
    return acc;
  }, []);

  return Object.values(grouped)
};