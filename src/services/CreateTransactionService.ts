import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(newTransaction: Omit<Transaction, 'id'>): Transaction {
    if (newTransaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < newTransaction.value) {
        throw Error('The current balance is lower than the value asked');
      }
    }
    const created = this.transactionsRepository.create(newTransaction);
    return created;
  }
}

export default CreateTransactionService;
