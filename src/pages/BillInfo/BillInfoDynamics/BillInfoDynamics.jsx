import styles from "./BillInfoDynamics.module.scss";
import {CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area} from 'recharts';

const BillInfoDynamics = ({transactions}) => {
  return (
    <div className={styles.dynamicsWrapper}>
      <h3>Динамика за последние 6 месяцев</h3>
      {transactions.length === 0 || !transactions ?
        <div className={styles.noTransactionsBlock}>No transactions in last 6 month</div> :
        <div className={styles.dynamicsBlock}>
              <AreaChart
                width={720}
                height={320}
                data={transactions}
                margin={{
                  top: 10,
                  right: 30,
                  left: transactions.find(item => item.count > 1000000) ? 20 : 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey='name' tickSize={15}/>
                <YAxis dataKey='count' />
                <Tooltip/>
                <Area type="monotone" dataKey="count" name='Сумма' stroke="#8884d8" fill="#8884d8"/>
              </AreaChart>
        </div>
      }

    </div>
  );
};

export default BillInfoDynamics;