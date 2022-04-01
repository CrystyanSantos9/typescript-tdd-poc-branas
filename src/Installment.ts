import Tax from './Tax';

export default class Installment {
  status: string;

  mdr = 0;

  constructor(readonly numberOfInstallment: number, readonly amount: number, readonly tax: Tax) {
    this.status = 'waiting_payment';
    this.calculateMdr();
  }

  calculateMdr() {
    if (this.tax.amount && this.tax.percentage) {
      this.mdr = (((this.amount * this.tax.percentage) / 100) + this.tax.amount);
      return;
    }

    if (this.tax.amount) {
      this.mdr = this.tax.amount;
    }

    if (this.tax.percentage) {
      this.mdr = ((this.amount * this.tax.percentage) / 100);
    }
  }
}
