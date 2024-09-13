import styles from './ChangeSingleCourse.module.scss';
import greenArrow from './icons/arrow-green.png';
import redArrow from './icons/arrow-red.png';

const ChangeSingleCourse = ({from, to, rate, change}) => {

  return (
    <div className={styles.changeSingleCourseWrapper}>
      <div className={styles.courseName}>
        <span>{from}/{to}</span>
      </div>
      <div className={styles.underlineBlock}></div>
      <div className={styles.courseDynamics}>
        <span className={styles.courseDynamicsValue}>{change > 0 ? '+'+rate : '-'+rate}</span>
        <span className={styles.courseDynamicsArrow}>
          <img className={change > 0 ? styles.rotateGreenArrow : styles.rotateRedArrow} src={change > 0 ? greenArrow : redArrow} alt=""/>
        </span>
      </div>
    </div>
  );
};

export default ChangeSingleCourse;