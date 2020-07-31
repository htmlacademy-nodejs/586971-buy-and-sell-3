'use strict';

/**
 * Функция для получения случайных значений из диапазона
 * @return {array} - случайное число
 * @param {array} min - "от"
 * @param {array} max - "до"
 * */
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Функция для перетасовки массива алгоритмом тасования Фишера-Йетса
 * @return {array} - перетасованный массив
 * @param {array} someArray - исходный массив
 * */
module.exports.shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};
