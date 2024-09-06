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
          <span>Номер счета: {billData && billData.account}</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span>Дата открытия счета: {billData && convertData(billData.date)}</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span>Текущий баланс счета: {billData && billData.balance.toFixed(2)} RUB</span>
        </div>
        <div className={styles.billInfoBlock}>
          <span>Последняя транзацкия: {lastTransaction && convertData(lastTransaction.date)} </span>
        </div>
      </div>
    </div>
  );
}