import {useLoaderData} from "react-router-dom";
import styles from './BillInfo.module.scss';
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import BillInfoDynamics from "./BillInfoDynamics/BillInfoDynamics.jsx";
import BillInfoHistory from "./BillInfoHistory/BillInfoHistory.jsx";
import TransferForm from "./TransferForm/TransferForm.jsx";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getData,
  getLastSixMonthTransactions,
  getSingleAccountData, getTransactionsHistory
} from "../../store/singleAccount/SingleAccountSlice.js";
import {getToken} from "../../store/login/loginSlice.js";
import {getAccountCurrencies, getAllBillsNumbers} from "../../store/account/accountsSlice.js";
import {BillInfoMainData} from "./BillInfoMainData/BillInfoMainData.jsx";
import {useResize} from "../../features/useResize/useResize.js";

const BillInfo = () => {
  const dispatch = useDispatch();
  const billData = useSelector(getData);
  const lastSixMonthTransactions = useSelector(getLastSixMonthTransactions);
  const transactionsHistory = useSelector(getTransactionsHistory);
  const allBillsNumbers = useSelector(getAllBillsNumbers);
  const token = useSelector(getToken);
  const navigate = useNavigate();
  const {billId} = useLoaderData();
  const resize = useResize();


  useEffect(() => {
    dispatch(getSingleAccountData(billId))

    if (!allBillsNumbers && token) {
      dispatch(getAccountCurrencies())
    }
  }, [token]);

  return (
    <div>
      <div className={styles.BillInfoPageWrapper}>
        <div className="container">
          <div className={styles.BillInfoTitleWrapper}>
            <h2 className={styles.BillInfoTitle}>Счет <span>№{billId}</span></h2>
            <Button
              padding='14px 40px'
              width={resize < 400 ? 100+'%' : ''}
              func={() => {
                navigate('/bills');
              }}
              isDispatching={false}>Вернуться</Button>
          </div>
          <BillInfoMainData billData={billData} lastTransaction={transactionsHistory[0]}/>
          <div className={styles.mainWrapper}>
            <BillInfoDynamics transactions={lastSixMonthTransactions} resize={resize}/>
            <BillInfoHistory transactionsHistory={transactionsHistory} currentAccount={billData?.account ? billData?.account : ''}/>
          </div>
          <TransferForm allBillsNumbers={allBillsNumbers} currentAccount={billData?.account ? billData?.account : ''}/>
        </div>
      </div>
    </div>
  );
};

export default BillInfo;