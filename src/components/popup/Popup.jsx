import styles from './Popup.module.scss';
import {useSelector} from "react-redux";
import {popupIsShow, popupText} from "../../store/popup/popupSlice.js";

const Popup = () => {
  const text = useSelector(popupText);
  const showModal = useSelector(popupIsShow);

  console.log(text, showModal);

  return (
    <div className={`${styles.popupWrapper} ${showModal ? styles.isShow : ''}`}>
      <span className={styles.popupText}>
        {text}
      </span>
    </div>
  );
};

export default Popup;