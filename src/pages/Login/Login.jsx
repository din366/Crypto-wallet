import LoginForm from "./LoginForm/LoginForm.jsx";
import styles from './Login.module.scss';
import {useLogged} from "../../features/useLogged/useLogged.js";

const Login = () => {
  useLogged();

  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
};

export default Login;