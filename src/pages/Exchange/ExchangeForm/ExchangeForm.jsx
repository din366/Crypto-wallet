import {useFormik} from "formik";
import styles from "./ExchangeForm.module.scss";
import Button from "../../../components/Button/Button.jsx";

const validate = values => {
  const errors = {};
}

const ExchangeForm = () => {
  const formik = useFormik({
    initialValues: {
      where: '',
      amount: '',
      to: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <div className={styles.formBlock}>
      <h3 className={styles.formTitle}>Обмен валюты</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputsFlexWrapper}>
          <div className={styles.inputWrapper}>
            <label htmlFor="where">Откуда</label>
            <select name="where"> {/* ! MAP */}
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="to">Куда</label>
            <select name="to"> {/* ! MAP */}
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div className={styles.inputWrapper}>
            <label htmlFor="amount">Сумма</label>
            <input
              id="amount"
              name="amount"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
          </div>
        </div>


        <div className={styles.buttonWrapper}>
          <Button
            padding='10px 30px'
            fontSize={16}
            width='30%'
          >Обменять</Button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;