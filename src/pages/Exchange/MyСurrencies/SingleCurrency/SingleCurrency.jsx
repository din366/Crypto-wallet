import styles from './singleCurrency.module.scss';

const SingleCurrency = ({data}) => {
  return (
    <div>
      <div className={styles.currencyWrapper}>
        <span className={styles.currencyTitle}>{data.code}:</span>
        <span className={styles.underline}></span>
        <span className={styles.currencyAmount}>{data.amount}</span>
      </div>
    </div>
  );
};

export default SingleCurrency;