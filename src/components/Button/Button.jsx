
import styles from './Button.module.scss';
import {useDispatch} from "react-redux";

const Button = ({
                  func,
                  type = '',
                  disabled = false,
                  fontSize = '',
                  isDispatching = true,
                  children,
                  ...args
}) => {
  const dispatch = useDispatch();

  const getFunction = () => {
      if (isDispatching) {
        dispatch(func());
      } else {
        func();
      }
    };

  return <button
    style={args}
    disabled={disabled}
    className={styles.btn}
    type={type ? type : 'button'}
    onClick={() => { func ? getFunction() : ''}}
  >
    <span style={{fontSize}}>{children}</span>
  </button>;
};


export default Button;