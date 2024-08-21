import styles from './LoginForm.module.scss';
import {useFormik} from "formik";
import Button from "../../../components/Button/Button.jsx";

const validate = values => {
  const errors = {};
}

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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

        <Button
          text='Вход'
          width={100 + '%'}
          padding= '20px 140px'
          margin-top={10}
          fontSize={18}
        ></Button>
      </form>
    </div>
  );
};

export default LoginForm;