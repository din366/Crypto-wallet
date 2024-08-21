import styles from './SingleBill.module.scss';
import {convertData} from "../../../features/ConvertData/ConvertData.js";


const SingleBill = ({data}) => {

  const {
    account,
    balance,
    transactions,
  } = data;

  return (
    <div className={styles.billBlock}>
      <span className={styles.billAccount}>{account}</span>
      <span className={styles.billBalance}>{balance} RUB</span>
      <div className={styles.billLastTransactionWrapper}>
        <span className={styles.billLastTransactionTitle}>Последняя транзацкия</span>
        <span className={styles.billLastTransactionDate}>{convertData(data.transactions[0].date)}</span>
      </div>
    </div>
  );
};

export default SingleBill;