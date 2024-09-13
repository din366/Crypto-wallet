import styles from "./ChangeCourse.module.scss";
import ChangeSingleCourse from "./ChangeSingleCourse/ChangeSingleCourse.jsx";

const ChangeCourse = () => {
  return (
    <div className={styles.changeCourseInfo}>
      <div className={styles.changeCourseWrapper}>
        <div className={styles.changeCourseBlock}>
          <h3>Изменение курса в режиме реального времени</h3>

          <ChangeSingleCourse isUp={false}/>
          <ChangeSingleCourse isUp={true}/>
        </div>
      </div>
    </div>
  );
};

export default ChangeCourse;