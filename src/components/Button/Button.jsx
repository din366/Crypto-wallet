
import styles from './Button.module.scss';

const Button = ({text, func}) => {
  return <button className={styles.btn} onClick={() => {func()}}>
    <span>{text}</span>
  </button>;
};


export default Button;