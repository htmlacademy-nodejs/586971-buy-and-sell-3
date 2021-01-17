'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require('../../constants');

class CommentService {
  create(offer, comment) {
    return offer.comments = [offer.comments, {id: nanoid(MAX_ID_LENGTH), test: comment.text}];
  }

  drop(offer, commentId) {
    const comment = offer.comments.find(item => item.id === commentId);

    if(!comment) {
      return null
    }

    return {...offer, comments: [offer.comments.filter(item => item !== comment)]}
  }
}

module.exports = CommentService;
