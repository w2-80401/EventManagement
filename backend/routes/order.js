const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');


router.get('/', async (request, response) => {
  try {
    const statement = `
      SELECT id, totalAmount, createdTimestamp 
      FROM booking
      WHERE userId = ?`;
    const [orders] = await db.execute(statement, [request.data.id]);
    response.send(utils.createSuccess(orders));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// GET order details by ID
router.get('/details/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const statement = `
      SELECT 
        event.name, event.details, venue.name AS venue_name, bookingDetails.attendees, bookingDetails.total_price, bookingDetails.booking_timestamp, bookingDetails.payment_status
      FROM bookingDetails
      JOIN event ON event.id = bookingDetails.event_id
      JOIN venue ON venue.id = bookingDetails.venue_id
      WHERE bookingDetails.booking_id = ?`;
    const [details] = await db.execute(statement, [id]);
    response.send(utils.createSuccess(details));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


router.post('/details', async (request, response) => {
  const { selectedEvent, selectedVenue, attendees, bookingDate, totalPrice, userId } = request.body;

  console.log(request.body);
  try {
    const statement = `
      INSERT INTO bookingDetails 
        (event_id, venue_id, user_id, attendees, total_price, booking_date, payment_status)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)`;

    await db.execute(statement, [
      Number(selectedEvent),
      Number(selectedVenue),
      userId,
      attendees,
      totalPrice,
      bookingDate,
      'unpaid' // Set default payment status to unpaid
    ]);

    response.send(utils.createSuccess('Booking details successfully created'));
  } catch (ex) {
    console.log(ex);
    response.send(utils.createError(ex));
  }
});

router.get('/bookingdetails', async (request, response) => {
  try {
    const statement = `
      SELECT * FROM bookingDetails`;

    const [rows, fields] = await db.execute(statement);

    response.send(rows); // Send the retrieved booking details
  } catch (ex) {
    console.log(ex);
    response.send(utils.createError(ex));
  }
});

// GET booking details with event names and venue names by user ID
router.get('/bookingDetails/user/:userId', async (request, response) => {
  const { userId } = request.params;
  try {
    const statement = `
      SELECT 
        bd.id, e.name AS event_name, v.name AS venue_name, bd.attendees, bd.total_price, bd.booking_date, bd.booking_timestamp, bd.payment_status
      FROM bookingDetails bd
      INNER JOIN event e ON bd.event_id = e.id
      INNER JOIN venue v ON bd.venue_id = v.id
      WHERE bd.user_id = ?`;
    const [bookingDetails] = await db.execute(statement, [userId]);
    if (bookingDetails.length === 0) {
      response.status(404).send(utils.createError('No booking details found for this user'));
    } else {
      response.send(utils.createSuccess(bookingDetails));
    }
  } catch (ex) {
    console.error(ex);
    response.status(500).send(utils.createError('Internal server error'));
  }
});

// GET booking details with user details, event names, and venue names for all users
router.get('/allbookings', async (request, response) => {
  try {
    const statement = `
      SELECT 
        bd.id, bd.user_id, u.firstName, u.lastName, u.phone, e.name AS event_name, v.name AS venue_name, bd.attendees, bd.total_price, bd.booking_date, bd.booking_timestamp, bd.payment_status
      FROM bookingDetails bd
      INNER JOIN event e ON bd.event_id = e.id
      INNER JOIN venue v ON bd.venue_id = v.id
      INNER JOIN user u ON bd.user_id = u.id`;
    const [bookingDetails] = await db.execute(statement);
    if (bookingDetails.length === 0) {
      response.status(404).send(utils.createError('No booking details found'));
    } else {
      response.send(utils.createSuccess(bookingDetails));
    }
  } catch (ex) {
    console.error(ex);
    response.status(500).send(utils.createError('Internal server error'));
  }
});

router.post('/payment', async (request, response) => {
  const { booking_id, amount, card_number, name_on_card, cvv } = request.body;

  try {
    if (typeof amount === 'undefined') {
      throw new Error('Amount is undefined');
    }

    // Ensure amount is a valid number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      throw new Error('Invalid amount');
    }

    const statement = `
      INSERT INTO payment 
        (booking_id, amount, card_number, name_on_card, cvv)
      VALUES
        (?, ?, ?, ?, ?)`;

    await db.execute(statement, [booking_id, parsedAmount, card_number, name_on_card, cvv]);

    // Update the payment status in bookingDetails table to 'paid'
    const updateStatement = `
      UPDATE bookingDetails
      SET payment_status = 'paid'
      WHERE id = ?`;

    await db.execute(updateStatement, [booking_id]);

    response.send(utils.createSuccess('Payment data inserted successfully'));
  } catch (ex) {
    console.error('Error processing payment:', ex);
    response.status(500).send(utils.createError('Error processing payment'));
  }
});

router.get('/payment/all', async (request, response) => {
  try {
    // SQL query to retrieve all payment records
    const statement = `
      SELECT * FROM payment`;

    // Execute the SQL query
    const [payments] = await db.execute(statement);

    // Send the retrieved payment records as a response
    response.send(utils.createSuccess(payments));
  } catch (ex) {
    console.error('Error fetching payments:', ex);
    response.status(500).send(utils.createError('Error fetching payments'));
  }
});



module.exports = router;
