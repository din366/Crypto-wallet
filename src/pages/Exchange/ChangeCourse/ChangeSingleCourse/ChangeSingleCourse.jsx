import styles from './ChangeSingleCourse.module.scss';
import greenArrow from './icons/arrow-green.png';
import redArrow from './icons/arrow-red.png';

const ChangeSingleCourse = ({isUp}) => {
  return (
    <div className={styles.changeSingleCourseWrapper}>
      <div className={styles.courseName}>
        <span>AUD/BTC</span>
      </div>
      <div className={styles.underlineBlock}></div>
      <div className={styles.courseDynamics}>
        <span className={styles.courseDynamicsValue}>+4,754</span>
        <span className={styles.courseDynamicsArrow}>
          <img className={isUp ? styles.rotateGreenArrow : styles.rotateRedArrow} src={isUp ? greenArrow : redArrow} alt=""/>
        </span>
      </div>
    </div>
  );
};

export default ChangeSingleCourse;