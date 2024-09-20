import styles from './ErrorInfo.module.scss';
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const ErrorInfo = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mainWrapper}>
      <div>Pages not found</div>
      <Button fontSize={20} func={() => {navigate('/')}}>Go to main page</Button>
    </div>
  );
};

export default ErrorInfo;