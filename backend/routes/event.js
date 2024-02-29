const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/') // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Unique filename for uploaded image
  }
});

// Set up Multer upload
const upload = multer({ storage: storage });




// GET all events
router.get('/get', async (request, response) => {
  try {
    const statement = `
      SELECT id, name, details, image, createdTimestamp
      FROM event
    `;
    const [result] = await db.execute(statement, []);
    response.send(result);
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// Add event
router.post('/add', upload.single('image'), async (request, response) => {
  try {
    const { name, details } = request.body;
    const image = request.file ? request.file.filename : null; // Check if file uploaded, if not set image to null
    const statement = `
      INSERT INTO event (name, details, image)
      VALUES (?, ?, ?)
    `;
    await db.execute(statement, [name, details, image]);
    response.send(utils.createSuccess('Event added successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// Update event
router.put('/update/:id', async (request, response) => {
  try {
    const eventId = request.params.id;
    const { name, details } = request.body;

    // Construct the SQL update statement based on provided fields
    let statement = 'UPDATE event SET ';
    const values = [];

    if (name !== undefined) {
      statement += 'name = ?, ';
      values.push(name);
    }
    if (details !== undefined) {
      statement += 'details = ?, ';
      values.push(details);
    }

    statement = statement.slice(0, -2);

    statement += ' WHERE id = ?';
    values.push(eventId);

    await db.execute(statement, values);
    response.send(utils.createSuccess('Event updated successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


// Delete event
router.delete('/delete/:id', async (request, response) => {
  try {
    const eventId = request.params.id;
    const statement = `
      DELETE FROM event
      WHERE id = ?
    `;
    await db.execute(statement, [eventId]);
    response.send(utils.createSuccess('Event deleted successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// Get event by ID
router.get('/:id', async (request, response) => {
  try {
    const eventId = request.params.id;
    const statement = `
      SELECT id, name, details, image, createdTimestamp
      FROM event
      WHERE id = ?
    `;
    const [result] = await db.execute(statement, [eventId]);
    if (result.length === 0) {
      response.status(404).send(utils.createError('Event not found'));
    } else {
      response.send(utils.createSuccess(result[0]));
    }
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


module.exports = router;
