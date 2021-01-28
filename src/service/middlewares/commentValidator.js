'use strict';

const {HttpCode} = require(`../../constants`);

const offerKeys = [`text`];

module.exports = (req, res, next) => {
  const newComment = req.body;
  const keys = Object.keys(newComment);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
