import styles from "./BillInfoHistory.module.scss";

const BillInfoHistory = ({transactionsHistory, currentAccount}) => {
    const getTransactionsAccount = (transaction) => {
      if (currentAccount === transaction.to) {
        return {
          transactionDirection: 'to',
          transactionNumber: transaction.from
        };
      } else {
        return {
          transactionDirection: 'from',
          transactionNumber: transaction.to
        }
      }
    }

    const getTransactionsInfo = (transaction) => {
      const transactionAccount = getTransactionsAccount(transaction);

      transactionAccount.date = new Date(transaction.date).toLocaleDateString();

      if (transactionAccount.transactionDirection === 'from') {
        transactionAccount.redFlag = true;
        transactionAccount.amount = -transaction.amount;
      } else {
        transactionAccount.redFlag = false;
        transactionAccount.amount = transaction.amount;
      }

      return transactionAccount;
    }


    return (
      <>
        <div className={styles.historyWrapper}>
          <h3>История переводов</h3>
          {!transactionsHistory ?
            'no transactions history yet' :

            <div className={styles.historyBlock}>
              <div className={styles.tableContainer}>
                <table>
                  <thead>
                  <tr className={styles.tableRowsHeader}>
                    <td>Счет</td>
                    <td>Сумма</td>
                    <td>Дата</td>
                  </tr>
                  </thead>
                  <tbody>
                  {transactionsHistory.map((item) => {
                    const getTransaction = getTransactionsInfo(item);
                    return (
                      <tr className={styles.tableRows} key={item.date}>
                        <td>{getTransaction.transactionNumber}</td>
                        <td
                          style={getTransaction.redFlag ? {color: '#fa4f4f'} : {color: 'white'}}>{getTransaction.amount}</td>
                        <td>{getTransaction.date}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      </>
    );
  }
;

export default BillInfoHistory;