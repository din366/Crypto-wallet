import styles from './BillInfoMainData.module.scss';
import {convertData} from "../../../features/ConvertData/ConvertData.js";
import {useEffect} from "react";
export const BillInfoMainData = ({billData, lastTransaction}) => {
  useEffect(() => {

  }, [billData?.balance])

  return (
    <div className={styles.billMainInfo}>
      <div className={styles.billInfoWrapper}>
        <div className={styles.billInfoBlock}>
          <span className={styles.billInfoName}>Номер счета: </span><span className={styles.billInfoAccount}>{billData && billData.account}</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span className={styles.billInfoName}>Дата открытия счета: </span><span>{billData && convertData(billData.date)}</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span className={styles.billInfoName}>Текущий баланс счета: </span><span>{billData && billData.balance.toFixed(2)} RUB</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span className={styles.billInfoName}>Последняя транзацкия: </span><span>{lastTransaction ? convertData(lastTransaction.date) : 'no transactions yet'}</span>
        </div>
      </div>
    </div>
  );
}