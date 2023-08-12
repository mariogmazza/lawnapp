const { json } = require('body-parser');
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;
    const token = jwt.sign({ id, username }, process.env.SECRET);

    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    next(err);
  }
};
