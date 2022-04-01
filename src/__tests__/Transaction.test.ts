/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable-next-line no-undef */
import { classicNameResolver } from 'typescript';
import Transaction from '../Transaction';
import Tax from '../Tax';

test('Deve criar uma transação aberta', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'boleto';
  const installments = 1;
  const tax = new Tax('boleto', 0, 5);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  const status = transaction.getStatus();
  expect(status).toBe('waiting_payment');
});

test('Deve criar uma transação e realizar um pagamento', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'boleto';
  const installments = 1;
  const tax = new Tax('boleto', 0, 5);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  transaction.pay(1);
  const status = transaction.getStatus();
  expect(status).toBe('paid');
});

test('Deve criar uma transação no boleto à vista e realizar um pagamento e calcular o MDR ( Merchant Discount Rate)', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'boleto';
  const installments = 1;
  const tax = new Tax('boleto', 0, 5);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  transaction.pay(installments);
  const [installment1] = transaction.installments;
  expect(installment1.mdr).toBe(5);
});

test('Deve criar uma transação no cartão de crédito  em 4 parcelas, calcular o MDR ( Merchant Discount Rate) e realizar o pagamento', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'credit_card';
  const installments = 4;
  const tax = new Tax(paymentMethod, 1, 0);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  transaction.pay(1);
  const [installment1] = transaction.installments;
  expect(installment1.mdr).toBe(2.5);
});

test('Deve criar uma transação no cartão de crédito  em 4 parcelas, receber um valor de taxa percentual e fixa, calcular o MDR ( Merchant Discount Rate) e realizar o pagamento', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'credit_card';
  const installments = 4;
  const tax = new Tax(paymentMethod, 1, 0.50);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  transaction.pay(1);
  const [installment1] = transaction.installments;
  expect(installment1.mdr).toBe(3);
});

test('Deve criar uma transação no cartão de crédito em 4 vezes e realizar um pagamento da primeira', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'credit_card';
  const installments = 4;
  const tax = new Tax('credit_card', 1, 0);
  const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
  const [installment1, installment2, installment3, installment4] = transaction.installments;
  transaction.pay(1);
  expect(installment1.amount).toBe(250);
  expect(installment1.status).toBe('paid');
  expect(installment2.amount).toBe(250);
  expect(installment2.status).toBe('waiting_payment');
  expect(installment3.amount).toBe(250);
  expect(installment3.status).toBe('waiting_payment');
  expect(installment4.amount).toBe(250);
  expect(installment4.status).toBe('waiting_payment');
  expect(transaction.getBalance()).toBe(750);
});
