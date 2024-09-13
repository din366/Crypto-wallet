import styles from './Exchange.module.scss';
import ExchangeForm from "./ExchangeForm/ExchangeForm.jsx";
import ChangeCourse from "./ChangeCourse/ChangeCounse.jsx";

const Exchange = () => {
  return (
    <div className={styles.exchangePageWrapper}>
      <div className="container">
        <div className={styles.exchangeTitleWrapper}>
          <h2 className={styles.exchangeTitle}>Обмен валюты</h2>
        </div>

        <div className={styles.exchangeFlexWrapper}>
          <ChangeCourse />

          <div className={styles.exchangeCurrency}>
            <ExchangeForm />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Exchange;