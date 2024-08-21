
import styles from './Button.module.scss';

const Button = ({text, func, fontSize = '', ...args}) => {
  return <button style={args} className={styles.btn} onClick={() => {func()}}>
    <span style={{fontSize}}>{text}</span>
  </button>;
};


export default Button;