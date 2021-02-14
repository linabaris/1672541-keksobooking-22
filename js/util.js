const getRandomIntegerInclusive = function (min, max) {
  // taken from https://developer.mozilla.org/en-US/
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

const getRandomFloatInclusive = function (min, max, symbolNumber) {
  const randomFloat = Math.random()*(max - min +1) + min;
  return +randomFloat.toFixed(symbolNumber);
}

const getMixedArr = function (arr) {
  let mixedArr = [];
  const newArrLength = getRandomIntegerInclusive(0, arr.length - 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  for (let i = 0; i < newArrLength; i++) {
    if (!mixedArr.includes(arr[i])) {
      mixedArr.push(arr[i]);
    }
  }
  return mixedArr;
}

export {
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getMixedArr
}
