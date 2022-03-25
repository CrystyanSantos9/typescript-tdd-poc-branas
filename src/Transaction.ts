/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import Installment from './Installment';

export default class Transaction {
  installments: Installment[];

  constructor(
        readonly email: string,
        readonly amount: number,
        readonly paymentMethod: string,
        readonly numberOfInstallments: number = 1,
  ) {
    this.installments = [];
    this.generateInstallments();
  }

  generateInstallments() {
    let installmentNumber = 1;
    const installmentAmount = this.amount / this.numberOfInstallments;
    while (installmentNumber <= this.numberOfInstallments) {
      const installment = new Installment(installmentNumber + 1, installmentAmount);
      this.installments.push(installment);
    }
  }

  getBalance() {
    let balance = this.amount;
    for (const installment of this.installments) {
      if (installment.status === 'paid') balance -= installment.amount;
    }
    return balance;
  }

  pay(installmentNumber: number) {
    const installment = this.installments.find(
      (installment) => installment.numberOfInstallment === installmentNumber,
    );
    if (!installment) throw new Error();
    installment.status = 'paid';
  }

  getStatus(): string {
    const balance = this.getBalance();
    if (balance === 0) return 'paid';
    return 'waiting_payment';
  }
}
