const express = require('express');
const router = express.Router();
const db = require('../db');
const utils = require('../utils');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/signup', async (request, response) => {
  const { firstName, lastName, email, password, phone } = request.body;

  try {
    const encryptedPassword = String(cryptoJs.SHA256(password));
    const statement = `
      INSERT INTO user 
      (firstName, lastName, email, password, phone, role) 
      VALUES
      (?, ?, ?, ?, ?, 'USER')`;

    const result = await db.execute(statement, [
      firstName,
      lastName,
      email,
      encryptedPassword,
      phone
    ]);
    response.send(utils.createSuccess(result));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

router.post('/signin', async (request, response) => {
  const { email, password } = request.body;
  try {
    console.log(request.body);

    const encryptedPassword = String(cryptoJs.SHA256(password));
    const statement = `
      SELECT id, firstName, lastName, role, phone
      FROM user 
      WHERE 
      email = ? AND password = ?`;

    const [users] = await db.execute(statement, [email, encryptedPassword]);
    if (users.length === 0) {
      response.send(utils.createError('Invalid email or password'));
    } else {
      const user = users[0];
      const token = jwt.sign(
        {
          id: user['id'],
          firstName: user['firstName'],
          role: user['role'] // Include role in the JWT payload
        },
        config.secret
      );
      console.log(user);
      console.log(token);
      response.send(
        utils.createSuccess({
          token,
          firstName: user['firstName'],
          lastName: user['lastName'],
          role: user['role'],
          userId: user['id'],
          phone : user['phone'] // Include user ID in the response
        })
        
      );
      // console.log(firstName);
    }
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});


// Get all users
router.get('/', async (request, response) => {
  try {
    const statement = `SELECT id, firstName, lastName, email, phone, role FROM user`;
    const [users] = await db.execute(statement);
    response.send(utils.createSuccess(users));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// Update user
router.put('/:id', async (request, response) => {
  const userId = request.params.id;
  const { firstName, lastName, email, phone } = request.body;

  try {
    const statement = `
      UPDATE user 
      SET firstName = ?, lastName = ?, email = ?, phone = ?
      WHERE id = ?`;
    const result = await db.execute(statement, [firstName, lastName, email, phone, userId]);
    response.send(utils.createSuccess(result));
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});

// Get user by ID
router.get('/:id', async (request, response) => {
  const userId = request.params.id;

  try {
    const statement = `
      SELECT id, firstName, lastName, email, phone, role
      FROM user
      WHERE id = ?`;
    const [users] = await db.execute(statement, [userId]);

    if (users.length === 0) {
      response.send(utils.createError('User not found'));
    } else {
      const user = users[0];
      response.send(utils.createSuccess(user));
    }
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});
// Delete user by ID
router.delete('/:id', async (request, response) => {
  const userId = request.params.id;

  try {
    const statement = `
      DELETE FROM user
      WHERE id = ?`;
    const [result] = await db.execute(statement, [userId]);

    if (result.affectedRows === 0) {
      response.send(utils.createError('User not found'));
    } else {
      response.send(utils.createSuccess('User deleted successfully'));
    }
  } catch (ex) {
    response.send(utils.createError(ex));
  }
});



module.exports = router;
