import {useDispatch, useSelector} from "react-redux";
import {getToken} from "../../../store/login/loginSlice.js";
import {useEffect} from "react";
import {availableCurrencies, getAvailableCurrencies} from "../../../store/currencyExchange/currencyExchangeSlice.js";
import SingleCurrency from "./SingleCurrency/SingleCurrency.jsx";
import styles from './MyCurrencies.module.scss';

const MyCurrencies = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const currentAvailableCurrencies = useSelector(availableCurrencies);
  useEffect(() => {
    if (token) {
      dispatch(getAvailableCurrencies());
    }
  }, [token]);

  return (<div>
      <h3>Мои текущие валюты</h3>
      {currentAvailableCurrencies &&
        <div className={styles.singleCurrencyWrapper}>
          {Object.values(currentAvailableCurrencies)
            .map(item => <SingleCurrency key={item.code} data={item}/>)}
        </div>
      }
    </div>);
};

export default MyCurrencies;