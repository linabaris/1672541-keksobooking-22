const getRandomIntegerInclusive = function (min, max) {
  if (min > max || min == max) {
    return 'error';
  }
  // taken from https://developer.mozilla.org/en-US/
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

const getRandomFloatInclusive = function (min, max, symbolNumber) {
  if (min > max || min == max) {
    return 'error';
  }
  let randomFloat = Math.random()*(max - min +1) + min;
  return +randomFloat.toFixed(symbolNumber);
}
getRandomIntegerInclusive(3, 100);
getRandomFloatInclusive(0, 7, 4);
