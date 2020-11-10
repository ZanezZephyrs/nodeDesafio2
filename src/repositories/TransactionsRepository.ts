import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Info {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Info {
    const info = {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
    return info;
  }

  public getBalance(): Balance {
    const [totalIncome, totalOutcome] = this.transactions.reduce(
      (acc, trans) => {
        return trans.type === 'income'
          ? [acc[0] + trans.value, acc[1]]
          : [acc[0], acc[1] + trans.value];
      },
      [0, 0],
    );
    const newBalance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return newBalance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
