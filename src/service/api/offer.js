'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const {offerValidator} = require(`../middlewares/offerValidator`);
const {offerExist} = require(`../middlewares/offerExist`);
const {commentValidator} = require(`../middlewares/commentValidator`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`offers/`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    return res.status(HttpCode.OK)
      .json(offers);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.delete(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    offerService.drop(offerId);

    return res.status(HttpCode.OK)
      .send(`Offer ${offerId} has been deleted`);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const {offerId} = req.params;

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer.comments);
  });

  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    const {offerId} = req.params;
    const offerOld = offerService.findOne(offerId);
    const newOfferComment = commentService.create(offerOld, req.body);
    const offer = offerService.update(offerId, {...offerOld, comments: newOfferComment});

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.delete(`/:offerId/comments/:commentId`, (req, res) => {
    const {offerId, commentId} = req.params;
    const offerOld = offerService.findOne(offerId);
    const newOffer = commentService.drop(offerOld, commentId);
    if (!newOffer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found comment with ${commentId}`);
    }

    const offer = offerService.update(offerId, newOffer);

    return res.status(HttpCode.OK)
      .json(offer);
  });
};
