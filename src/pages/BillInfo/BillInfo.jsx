import {useLoaderData} from "react-router-dom";
import styles from './BillInfo.module.scss';
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import BillInfoDynamics from "./BillInfoDynamics/BillInfoDynamics.jsx";
import BillInfoHistory from "./BillInfoHistory/BillInfoHistory.jsx";
import BillInfoStatistics from "./BillInfoStatistics/BillInfoStatistics.jsx";
import TransferForm from "./TransferForm/TransferForm.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getData,
  getLastSixMonthTransactions,
  getSingleAccountData, getTransactionsHistory
} from "../../store/singleAccount/SingleAccountSlice.js";
import {getToken} from "../../store/login/loginSlice.js";

const BillInfo = () => {
  const dispatch = useDispatch();
  const billData = useSelector(getData);
  const lastSixMonthTransactions = useSelector(getLastSixMonthTransactions);
  const transactionsHistory = useSelector(getTransactionsHistory);
  const token = useSelector(getToken);
  const navigate = useNavigate();
  const {billId} = useLoaderData();

  useEffect(() => {
    dispatch(getSingleAccountData(billId))
  }, [token]);

  return (
    <div>
      <div className={styles.BillInfoPageWrapper}>
        <div className="container">
          <div className={styles.BillInfoTitleWrapper}>
            <h2 className={styles.BillInfoTitle}>Счет №{billId}</h2>
            <Button padding='14px 40px' func={() => {
              navigate(-1)
            }} text='Вернуться'></Button>
          </div>

          <div className={styles.mainWrapper}>
            <BillInfoDynamics transactions={lastSixMonthTransactions}/>
            <BillInfoHistory transactionsHistory={transactionsHistory} currentAccount={billData?.account ? billData?.account : ''}/>
            <BillInfoStatistics/>
          </div>
          <TransferForm/>
        </div>
      </div>
    </div>
  );
};

export default BillInfo;