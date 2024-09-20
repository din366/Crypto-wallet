import styles from "./BillInfoDynamics.module.scss";
import {CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer} from 'recharts';

const BillInfoDynamics = ({transactions, resize}) => {
  return (
    <div className={styles.dynamicsWrapper}>
      <h3>Динамика за последние 6 месяцев</h3>
      {transactions.length === 0 || !transactions ?
        <div className={styles.noTransactionsBlock}>No transactions in last 6 month</div> :
        <div className={styles.dynamicsBlock}>
          <ResponsiveContainer width={resize < 800 ? 100 + '%' : 720} height={resize < 800 ? resize / 2 : 320}>
              <AreaChart
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
          </ResponsiveContainer>
        </div>
      }

    </div>
  );
};

export default BillInfoDynamics;