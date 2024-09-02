
import styles from './Button.module.scss';
import {useDispatch} from "react-redux";

const Button = ({
                  text,
                  func,
                  type = '',
                  disabled = false,
                  fontSize = '',
                  ...args
}) => {
  const dispatch = useDispatch();
  return <button
    style={args}
    disabled={disabled}
    className={styles.btn}
    type={type ? type : 'button'}
    onClick={() => { func ? dispatch(func()) : ''}}
  >
    <span style={{fontSize}}>{text}</span>
  </button>;
};


export default Button;