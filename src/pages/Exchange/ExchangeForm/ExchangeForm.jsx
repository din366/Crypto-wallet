import {useFormik} from "formik";
import styles from "./ExchangeForm.module.scss";
import Button from "../../../components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  availableCurrenciesOnlyName,
  exchangeLoading,
  makeExchange
} from "../../../store/currencyExchange/currencyExchangeSlice.js";
import {validate} from "./formikValidateExchange.js";
import {useEffect} from "react";

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const userCurrencies = useSelector(availableCurrenciesOnlyName);
  const loading = useSelector(exchangeLoading);

  useEffect(() => {

  }, []);

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      amount: '',
    },
    onSubmit: async ({from, to, amount}, {setSubmitting, setErrors, resetForm}) => {

      const errors = await validate(from, to, amount.replace(',', '.'));
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        await dispatch(makeExchange({from, to, amount}));
        await resetForm();
      }
      setSubmitting(false);
    },
  })

  return (
    <div className={styles.formBlock}>
      <h3 className={styles.formTitle}>Обмен валюты</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputsFlexWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="from">Откуда</label>
            <select name="from" onChange={formik.handleChange} value={formik.values.from}>
              <option value="" disabled hidden>Выберите валюту</option>
              {userCurrencies && userCurrencies.map(item => <option key={`${item}from`} value={item}>{item}</option>)}
            </select>
            {formik.errors.from && <div className={styles.inputErrorBlock}>{formik.errors.from}</div>}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="to">Куда</label>
            <select name="to" onChange={formik.handleChange} value={formik.values.to}>
              <option value="" disabled hidden>Выберите валюту</option>
              {userCurrencies && userCurrencies.map(item => <option key={`${item}to`} value={item}>{item}</option>)}
            </select>
            {formik.errors.to && <div className={styles.inputErrorBlock}>{formik.errors.to}</div>}
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="amount">Сумма</label>
            <input
              id="amount"
              placeholder="Coin"
              name="amount"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.errors.amount && <div className={styles.inputErrorBlock}>{formik.errors.amount}</div>}
          </div>
        </div>


        <div className={styles.buttonWrapper}>
          <Button
            type='submit'
            padding='10px 30px'
            fontSize={16}
            width='30%'
            disabled={loading}
          >Обменять</Button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;