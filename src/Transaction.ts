/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */

import Installment from './Installment';
import Tax from './Tax';

export default class Transaction {
  installments: Installment[];

  constructor(
        readonly email: string,
        readonly amount: number,
        readonly paymentMethod: string,
        readonly numberOfInstallments: number = 1,
        readonly tax: Tax,
  ) {
    this.installments = [];
    this.generateInstallments();
  }

  generateInstallments() {
    let installmentNumber = 1;
    const installmentAmount = this.amount / this.numberOfInstallments;
    while (installmentNumber <= this.numberOfInstallments) {
      const installment = new Installment(installmentNumber, installmentAmount, this.tax);
      this.installments.push(installment);
      installmentNumber += 1;
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
      (installmentSelected) => installmentSelected.numberOfInstallment === installmentNumber,
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
