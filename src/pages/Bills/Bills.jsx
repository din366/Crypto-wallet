import styles from "./Bills.module.scss";
import Button from "../../components/Button/Button.jsx";
import SingleBill from "./SingleBill/SingleBill.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  getAccountCurrencies,
  getCurrencies, newAccount,
  newAccountButtonIsActive,
  sortCurrencies
} from "../../store/account/accountsSlice.js";
import {useEffect} from "react";
import {getLoading, getToken} from "../../store/login/loginSlice.js";
import {useNavigate} from "react-router-dom";

const Bills = () => {
  const dispatch = useDispatch();
  const billsData = useSelector(getCurrencies)
  const token = useSelector(getToken);
  const navigate = useNavigate();
  const isLoading = useSelector(getLoading);
  const newAccountIsLoading = useSelector(newAccountButtonIsActive);

  useEffect(() => {
    dispatch(getAccountCurrencies());
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    };
  }, []);

  return (
    <div className={styles.mainPage}>
      <div className="container">
        {isLoading ? <div>Loading...</div> : (
          <>
            <div className={styles.headTitle}>
              <h2>Здравствуйте, Александр!</h2>
              <Button
                text='Открыть новый счет'
                padding='14px 40px'
                disabled={!newAccountIsLoading}
                func={newAccount}
              ></Button>
            </div>
            <div className={styles.billsHeaderWrapper}>
              <div className={styles.billsTitle}><span>Мои счета</span></div>
              <div className={styles.billsSortWrapper}>
                <span className={styles.billsSortTitle}>Сортировка</span>
                <select name='select' onChange={
                  (event) => {
                    dispatch(sortCurrencies((event.target.options[event.target.selectedIndex].value)))
                  }}>
                  <option value="accountNumber">Номер счета</option>
                  <option value="balance">Баланс</option>
                  <option value="openAccountDate">Дата открытия счета</option>
                  <option value="lastTransactionDate">Дата последней транзакции</option>
                </select>
              </div>
            </div>
            <div className={styles.billsWrapper}>
              {}
              {billsData && billsData.map((data) => (
                <SingleBill data={data} key={data.account}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bills;