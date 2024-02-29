const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const multer = require('multer');
const serverAddress = "http://localhost:4001/venue"
// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) 
  }
});

const upload = multer({ storage: storage });

// GET all venues
router.get('/', async (request, response) => {
  try {
    const statement = `
      SELECT id, name, capacity, price, location, image, details
      FROM venue
    `;
    const [venues] = await db.execute(statement, []);
    response.send(utils.createSuccess(venues));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// POST new venue
router.post('/add', upload.single('image'), async (request, response) => {
  try {
    const { name, capacity, price, location, details } = request.body;
    const image = request.file.filename;
    const statement = `
      INSERT INTO venue (name, capacity, price, location, image, details)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.execute(statement, [name, capacity, price, location, image, details]);
    response.send(utils.createSuccess('Venue added successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.put('/update/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { name, capacity, price, location, details } = request.body;
    const statement = `
      UPDATE venue
      SET name = ?, capacity = ?, price = ?, location = ?, details = ?
      WHERE id = ?
    `;
    await db.execute(statement, [name, capacity, price, location, details, id]);
    response.send(utils.createSuccess('Venue updated successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// GET venue by ID
router.get('/:id', async (request, response) => {
  try {
    const venueId = request.params.id;
    const statement = `
      SELECT id, name, capacity, price, location, image, details
      FROM venue
      WHERE id = ?
    `;
    const [result] = await db.execute(statement, [venueId]);

    if (result.length === 0) {
      response.status(404).send(utils.createError('Venue not found'));
      return;
    }

    response.send(utils.createSuccess(result[0]));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


// DELETE venue
router.delete('/delete/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const statement = `
      DELETE FROM venue
      WHERE id = ?
    `;
    await db.execute(statement, [id]);
    response.send(utils.createSuccess('Venue deleted successfully'));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});



module.exports = router;
