import styles from './SingleBill.module.scss';
import {convertData} from "../../../features/ConvertData/ConvertData.js";
import {Link} from "react-router-dom";


const SingleBill = ({data}) => {

  const {
    account,
    balance,
    transactions,
    date,
  } = data;

  return (
      <Link style={{textDecoration: 'none'}} to={`${account}`} >
        <div className={styles.billBlock}>
          <span className={styles.billAccount}>{account}</span>
          <span className={styles.billBalance}>{balance} RUB</span>
          <div className={styles.billLastTransactionWrapper}>
            <div className={styles.billOpenWrapper}>
              <span className={styles.billLastTransactionTitle}>Открыт</span>
              <span className={styles.billOpen}>{convertData(date)}</span>
            </div>
            <div className="">
              <span className={styles.billLastTransactionTitle}>Последняя транзацкия</span>
              {transactions[0] ?
                <span className={styles.billLastTransactionDate}>{convertData(transactions[0].date)}</span> :
                <span className={styles.billLastTransactionDate}>no transactions</span>}
            </div>


          </div>
        </div>
      </Link>
  );
};

export default SingleBill;