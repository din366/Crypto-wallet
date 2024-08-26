import styles from './Exchange.module.scss';
import ExchangeForm from "./ExchangeForm/ExchangeForm.jsx";

const Exchange = () => {
  return (
    <div className={styles.exchangePageWrapper}>
      <div className="container">
        <div className={styles.exchangeTitleWrapper}>
          <h2 className={styles.exchangeTitle}>Обмен валюты</h2>
        </div>

        <div className={styles.exchangeWrapper}>
          <div className={styles.changeCourcesBlock}>
            <h3>Изменение курса в режиме реального времени</h3>
          </div>
        </div>
        
        <div className={styles.exchangeCurrency}>
          <ExchangeForm />
        </div>
      </div>
    </div>
  );
};

export default Exchange;