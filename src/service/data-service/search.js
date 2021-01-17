'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  find(searchString) {
    let searchResult = [];
    for (let i = 0; i < this._offers.length; i++) {
      if (this._offers[i].title.indexOf(searchString) !== -1) {
        searchResult.push(this._offers[i]);
      }
    }

    if (searchResult.length === 0) {
      return null;
    }

    return searchResult;
  }
}

module.exports = SearchService;
