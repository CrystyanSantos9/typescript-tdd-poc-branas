export default class Installment {
  status: string;

  constructor(readonly numberOfInstallment: number, readonly amount: number) {
    this.status = 'waiting_payment';
  }
}
