import {useFormik} from "formik";
import styles from "./TransferForm.module.scss";
import Button from "../../../components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getTransferLoading, setTransferRequest} from "../../../store/transfer/transferSlice.js";
import {validate} from "./formikValidateTransfer.js";
const TransferForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getTransferLoading);

  const formik = useFormik({
    initialValues: {
      bill: '',
      amount: '',
    },
    onSubmit: async ({bill, amount}, { setSubmitting, setErrors }) => {

      const errors = await validate(bill, amount.replace(',', '.'));
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        await dispatch(setTransferRequest({bill, amount}));
      }
      setSubmitting(false);
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
            placeholder='Введите счет получателя'
            onChange={formik.handleChange}
            value={formik.values.bill}
          />
          {formik.errors.bill && <div>{formik.errors.bill}</div>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="amount">Сумма</label>
          <input
            id="amount"
            name="amount"
            type="text"
            placeholder='Введите сумму платежа'
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          {formik.errors.amount && <div>{formik.errors.amount}</div>}
        </div>

        <div className={styles.inputWrapper}>
          <Button
            type='submit'
            text='Перевести'
            padding= '20px 70px'
            fontSize={18}
            width='100%'
            disabled={loading}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;