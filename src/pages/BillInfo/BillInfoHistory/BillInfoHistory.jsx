import styles from "./BillInfoHistory.module.scss";

const BillInfoHistory = () => {
  return (
    <div className={styles.historyWrapper}>
      <h3>История переводов</h3>
      <div className={styles.historyBlock}>
        <table>
          <tr>
            <th>Счет</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>

        </table>
      </div>
    </div>
  );
};

export default BillInfoHistory;