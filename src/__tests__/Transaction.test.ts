/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable-next-line no-undef */
import Transaction from '../Transaction';

test('Deve criar uma transação aberta', () => {
  const email = 'cryssantos@gmail.com';
  const amount = 1000;
  const paymentMethod = 'boleto';
  const transaction = new Transaction(email, amount, paymentMethod);
  const status = transaction.getStatus();
  expect(status).toBe('open');
});
