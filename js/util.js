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

const isEscEvent = function (evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
const isMouseEvent = (evt) => {
  return evt.type === 'click';
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
}

export {
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getMixedArr,
  isEscEvent,
  isMouseEvent,
  showAlert
}
