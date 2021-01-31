function getRandomIntegerInclusive (min, max) {
  if (min > max || min == max) {
    return 'Неверные значения порогов диапазона!';
  }
  // taken from https://developer.mozilla.org/en-US/
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

let getRandomFloatInclusive = function (min, max, numDecimalPlaces) {
  if (min > max || min == max) {
    return 'Неверные значения порогов диапазона!';
  }
  let randomFloat = Math.random()*(max - min +1) + min;
  return +randomFloat.toFixed(numDecimalPlaces);
}
