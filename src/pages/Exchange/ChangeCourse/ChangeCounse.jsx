import styles from "./ChangeCourse.module.scss";
import ChangeSingleCourse from "./ChangeSingleCourse/ChangeSingleCourse.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changedCourse, connectWebSocket} from "../../../store/changeCourseWebsocket/changeCourseWebsocketSlice.js";

const ChangeCourse = () => {
  const dispatch = useDispatch();
  const getChangedCourse = useSelector(changedCourse);

  useEffect(() => {
    const closeWebSocket = dispatch(connectWebSocket());

    return () => {
      closeWebSocket();
    };
  }, [dispatch]);

  return (
    <div className={styles.changeCourseInfo}>
      <div className={styles.changeCourseWrapper}>
        <div className={styles.changeCourseBlock}>
          <h3>Изменение курса в режиме реального времени</h3>

          {getChangedCourse.length > 0 && getChangedCourse.map(({from, to, rate, change}) =>
            <ChangeSingleCourse
              key={`${from}${to}${change}${rate}`} // generate unique key
              change={change}
              from={from}
              to={to} rate={rate}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeCourse;