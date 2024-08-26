import {useLoaderData} from "react-router-dom";
import styles from './BillInfo.module.scss';
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import BillInfoDynamics from "./BillInfoDynamics/BillInfoDynamics.jsx";
import BillInfoHistory from "./BillInfoHistory/BillInfoHistory.jsx";
import BillInfoStatistics from "./BillInfoStatistics/BillInfoStatistics.jsx";
import TransferForm from "./TransferForm/TransferForm.jsx";

const BillInfo = () => {
  const navigate = useNavigate();
  const {billId} = useLoaderData();

  return (
    <div>
      <div className={styles.BillInfoPageWrapper}>
        <div className="container">
          <div className={styles.BillInfoTitleWrapper}>
            <h2 className={styles.BillInfoTitle}>Счет №{billId}</h2>
            <Button padding='14px 40px' func={() => {navigate(-1)}} text='Вернуться'></Button>
          </div>

          <div className={styles.mainWrapper}>
            <BillInfoDynamics />
            <BillInfoHistory />
            <BillInfoStatistics />
            <TransferForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillInfo;