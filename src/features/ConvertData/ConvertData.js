export const convertData = (data) => {
  const date = new Date(Date.parse(data));

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}