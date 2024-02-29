// payment.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');

// POST new payment
router.post('/add', async (request, response) => {
  try {
    const { booking_id, amount } = request.body;
    const statement = `
      INSERT INTO payment (booking_id, amount)
      VALUES (?, ?)
    `;
    await db.execute(statement, [booking_id, amount]);
    response.send(utils.createSuccess('Payment added successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// GET all payments
router.get('/', async (request, response) => {
    try {
      const statement = `
        SELECT id, booking_id, amount, payment_date
        FROM payment
      `;
      const [payments] = await db.execute(statement, []);
      response.send(utils.createSuccess(payments));
    } catch (ex) {
      response.send(utils.createError(ex));
    }
  });

module.exports = router;
