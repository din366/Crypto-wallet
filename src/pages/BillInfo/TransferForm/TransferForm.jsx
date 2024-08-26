import {useFormik} from "formik";
import styles from "./TransferForm.module.scss";
import Button from "../../../components/Button/Button.jsx";

const validate = values => {
  const errors = {};
}

const TransferForm = () => {
  const formik = useFormik({
    initialValues: {
      bill: '',
      amount: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <div className={styles.formBlock}>
      <h3 className={styles.formTitle}>Перевод</h3>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="bill">Счет</label>
          <input
            id="bill"
            name="bill"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.bill}
          />
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

        <div className={styles.inputWrapper}>
          <Button
            text='Перевести'
            padding= '20px 70px'
            fontSize={18}
            width='100%'
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;