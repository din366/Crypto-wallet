
import styles from './Button.module.scss';

const Button = ({
                  text,
                  func,
                  type = '',
                  disabled = false,
                  fontSize = '',
                  ...args
}) => {
  return <button
    style={args}
    disabled={disabled}
    className={styles.btn}
    type={type ? type : 'button'}
    onClick={() => { func ? func() : ''}}
  >
    <span style={{fontSize}}>{text}</span>
  </button>;
};


export default Button;