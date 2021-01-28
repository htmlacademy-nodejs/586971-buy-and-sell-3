'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`search/`, route);

  route.get(`/`, (req, res) => {
    const {query} = req.query;
    const offers = service.find(query);

    if (!offers) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`not found offers with this name`);
    }

    return res.status(HttpCode.OK)
      .json(offers);
  });
};
