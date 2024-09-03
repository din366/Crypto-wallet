import styles from "./BillInfoDynamics.module.scss";
import {CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ResponsiveContainer} from 'recharts';

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
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <CustomXAxis/>
                <CustomYAxis/>
                <Tooltip/>
                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8"/>
              </AreaChart>
        </div>
      }

    </div>
  );
};

const CustomXAxis = ({dataKey = "name", ...props}) => {
  return <XAxis dataKey={dataKey} {...props} />;
};

const CustomYAxis = ({width = 50, height = 320, ...props}) => {
  return <YAxis width={width} height={height} {...props} />;
};

export default BillInfoDynamics;