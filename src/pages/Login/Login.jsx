import LoginForm from "./LoginForm/LoginForm.jsx";
import styles from './Login.module.scss';

const Login = () => {

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;