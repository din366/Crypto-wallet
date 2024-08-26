import styles from './LoginForm.module.scss';
import {useFormik} from "formik";
import Button from "../../../components/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getErrorData, getLoading, sendLoginRequest} from "../../../store/login/loginSlice.js";
import {validate} from "./formikValidate.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const sendError = useSelector(getErrorData);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const errors = await validate(values);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
      } else {
        dispatch(sendLoginRequest(values));
      }
      setSubmitting(false);
    },
  })

  return (
    <div className={styles.formBlock}>
      <h2 className={styles.formTitle}>Вход в аккаунт</h2>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          name="login"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.login}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        {formik.errors.login ? <div className={styles.errorBlock}>{formik.errors.login}</div> : null}
        {formik.errors.password ? <div className={styles.errorBlock}>{formik.errors.password}</div> : null}
        {sendError ? <div className={styles.errorBlock}>{sendError}</div> : null}

        <Button
          text='Вход'
          type='submit'
          width={100 + '%'}
          padding= '20px 140px'
          marginTop={10}
          fontSize={18}
          disabled={loading}
        ></Button>
      </form>
    </div>
  );
};

export default LoginForm;