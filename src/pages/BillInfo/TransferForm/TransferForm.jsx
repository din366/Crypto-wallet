import {useFormik} from "formik";
import styles from "./TransferForm.module.scss";
import Button from "../../../components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getTransferLoading, setTransferRequest} from "../../../store/transfer/transferSlice.js";
import {validate} from "./formikValidateTransfer.js";

const TransferForm = ({allBillsNumbers, currentAccount}) => {
  const dispatch = useDispatch();
  const loading = useSelector(getTransferLoading);
  console.log(`loading!! ${loading}`)
  const firstBillNumber = (allBills) => {
    if (!allBills) return '';
    return allBills.filter(item => item !== currentAccount);
  }

  const formik = useFormik({
    initialValues: {
      bill: '',
      amount: '',
    },
    onSubmit: async ({bill, amount}, {setSubmitting, setErrors, resetForm}) => {

      const errors = await validate(bill, amount.replace(',', '.'));
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        await dispatch(setTransferRequest({bill, amount}));
        await resetForm();
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
          <select name='bill' onChange={formik.handleChange} value={formik.values.bill}>
            <option value="" disabled selected hidden>Выберите счет получателя</option>

            {allBillsNumbers ? firstBillNumber(allBillsNumbers).map(item => <option key={item}
                                                                                    value={item}>{item}</option>) : ''}
          </select>
          {formik.errors.bill && <div className={styles.inputErrorBlock}>{formik.errors.bill}</div>}
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
          {formik.errors.amount && <div className={styles.inputErrorBlock}>{formik.errors.amount}</div>}
        </div>

        <div className={styles.inputWrapper}>
          <Button
            type='submit'
            text='Перевести'
            padding='20px 70px'
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