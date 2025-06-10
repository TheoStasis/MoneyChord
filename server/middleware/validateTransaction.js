const { body, validationResult } = require('express-validator');

const validateTransaction = [
  // Type validation
  body('type')
    .notEmpty()
    .withMessage('Transaction type is required')
    .isIn(['credit', 'debit'])
    .withMessage('Transaction type must be either credit or debit'),

  // Amount validation
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be greater than 0'),

  // Category validation
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Food', 'Travel', 'Billing', 'Others'])
    .withMessage('Invalid category'),

  // Description validation (optional)
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  // Validation result check
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateTransaction; 