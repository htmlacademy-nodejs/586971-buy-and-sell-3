'use strict';

const fs = require(`fs`).promises;
const FILE_NAME = `mocks.json`;
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }

  return Promise.resolve(data);
};


module.exports = getMockData;
