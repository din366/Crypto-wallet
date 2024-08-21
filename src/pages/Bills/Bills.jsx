import styles from "./Bills.module.scss";
import Button from "../../components/Button/Button.jsx";
import SingleBill from "./SingleBill/SingleBill.jsx";

const Bills = () => {
  const billsData = [
    {
      "account": "11304142237773744060783754",
      "balance": 12,
      "transactions": [
        {
          "amount": 1234,
          "date": "2021-08-24T15:00:41.576Z",
          "from": "25374745822886120828265011",
          "to": "21304142477773744060783754"
        }
      ]
    },
    {
      "account": "21304142477773744060783754",
      "balance": 2464,
      "transactions": [
        {
          "amount": 1234,
          "date": "2021-08-24T15:00:41.576Z",
          "from": "25374745822886120828265011",
          "to": "21304142477773744060783754"
        }
      ]
    }
  ]


  return (
    <div className={styles.mainPage}>
      <div className="container">
        <div className={styles.headTitle}>
          <h2>Здравствуйте, Александр!</h2>
          <Button text='Открыть новый счет' padding='14px 40px'></Button>
        </div>
        <div className={styles.billsHeaderWrapper}>
          <div className={styles.billsTitle}><span>Мои счета</span></div>
          <div className={styles.billsSortWrapper}>
            <span className={styles.billsSortTitle}>Сортировка</span>
            <select name='select'>
              <option value="date">Номер счета</option>
              <option value="balance">Баланс</option>
              <option value="open-date">Дата открытия счета</option>
              <option value="transaction-date">Дата последней транзакции</option>
            </select>
          </div>
        </div>
        <div className={styles.billsWrapper}>
          {billsData.map((data) => (
            <SingleBill data={data} key={data.account} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bills;