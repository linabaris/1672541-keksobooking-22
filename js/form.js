import { ACCURACY } from './data.js'
import { isMouseEvent, isEscEvent } from './util.js'
import { resetMap } from './map.js'
import { sendData } from './server.js'

const MAX_INPUT_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formElement = form.querySelectorAll('fieldset');
const mapFiltersElement = mapFilters.querySelectorAll('select, fieldset');
const address = form.querySelector('#address');
const titleInput = form.querySelector('#title');
const houseInputPrice = form.querySelector('#price');
const roomsNumber = form.querySelector('#room_number');
const guestsNumber = form.querySelector('#capacity');
const houseType = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const resetButton = form.querySelector('.ad-form__reset');
const mainBlock = document.querySelector('main');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;

const fillAddress = function ({ lat, lng }) {
  const lattitude = lat.toFixed(ACCURACY);
  const longitude = lng.toFixed(ACCURACY);
  address.readOnly = true;
  address.value = `${lattitude} ${longitude}`;
}

const resetMutableFields = function(form) {
  form.reset();
}

const resetAll = function () {
  resetMap();
  resetMutableFields(form);
  resetMutableFields(mapFilters);
}

// reset by 'click' on reset button
resetButton.addEventListener('click', function () {
  resetAll();
})


// inactive state of the card
let className = null;
const changeClass = function () {
  formElement ? className = 'ad-form--disabled' : className = 'map__filters--disabled';
}

const inactivateForm = function (form, setElements) {
  changeClass();
  form.classList.add(className);
  setElements.forEach((elem) => {
    elem.disabled = true;
  })
}

// active state of the map
const activateForm = function (form, setElements) {
  changeClass();
  form.classList.remove(className);
  setElements.forEach((elem) => {
    elem.disabled = false;
  })
}

const disableForm = function () {
  inactivateForm(mapFilters, mapFiltersElement);
  inactivateForm(form, formElement);
}
const enableForm = function () {
  activateForm(mapFilters, mapFiltersElement);
  activateForm(form, formElement);
}

// user input processing logic
const housingPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
}

const changeMinPrice = function () {
  const minPrice = housingPrice[houseType.value];
  houseInputPrice.placeholder = minPrice;
  houseInputPrice.min = minPrice;
}

houseType.addEventListener('change', function () {
  changeMinPrice();
})

// sync timeIn and timeOut
timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
})
timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
})

// validate title field
titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooshort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Необходимо заполнить поле');
  } else {
    titleInput.setCustomValidity('');
  }
})

//validate price field
houseInputPrice.addEventListener('input', function () {
  const valuePrice = Number.parseInt(houseInputPrice.value);
  if (houseInputPrice.validity.valueMissing) {
    houseInputPrice.setCustomValidity('Необходимо заполнить поле');
  } else if (valuePrice > MAX_INPUT_PRICE) {
    houseInputPrice.setCustomValidity('Превышено допустимое значение цены');
  } else {
    houseInputPrice.setCustomValidity('');
  }
})

//sync rooms and guests number
const setLimitGuests = function () {
  if (Number.parseInt(roomsNumber.value) < Number.parseInt(guestsNumber.value)) {
    guestsNumber.setCustomValidity('Число гостей не должно превышать число комнат');
  } else if (roomsNumber.value !== '100' && guestsNumber.value === '0') {
    guestsNumber.setCustomValidity('Вариант не для гостей подходит только для 100 комнат');
  } else if (roomsNumber.value === '100' && guestsNumber.value !== '0') {
    guestsNumber.setCustomValidity('Такому количеству комнат соответсвует вариант не для гостей');
  } else {
    guestsNumber.setCustomValidity('');
  }
}
guestsNumber.addEventListener('change', function () {
  setLimitGuests();
})
roomsNumber.addEventListener('change', function () {
  setLimitGuests();
})

// show success message
const showSuccessMessage = function () {
  mainBlock.append(successMessage);
  document.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', closeSuccessMessage);
  resetAll();
}

//close message
const closeSuccessMessage = function (evt) {
  if (isMouseEvent(evt) || isEscEvent(evt)) {
    evt.preventDefault();
    const successElem = mainBlock.querySelector('.success');
    successElem.remove();
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', closeSuccessMessage);
  }
}

//show error message
const showErrorMessage = function () {
  mainBlock.append(errorMessage);
  document.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', closeErrorMessage);
  const errorButton = mainBlock.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
}

const closeErrorMessage = function (evt) {
  if (isMouseEvent(evt) || isEscEvent(evt)) {
    evt.preventDefault();
    const errorElem = mainBlock.querySelector('.error');
    errorElem.remove();
    document.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', closeErrorMessage);
    const errorButton = mainBlock.querySelector('.error__button');
    errorButton.removeEventListener('click', closeErrorMessage);
  }
}

//submitting firm on the server
const setFormSubmit = function () {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    sendData(showSuccessMessage, showErrorMessage, new FormData(evt.target))
  });
};
setFormSubmit();
export {
  disableForm,
  enableForm,
  fillAddress
}
