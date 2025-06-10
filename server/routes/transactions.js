const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const validateTransaction = require('../middleware/validateTransaction');

router.route('/')
  .get(getTransactions)
  .post(validateTransaction, createTransaction);

router.route('/:id')
  .get(getTransaction)
  .put(validateTransaction, updateTransaction)
  .delete(deleteTransaction);

module.exports = router; 