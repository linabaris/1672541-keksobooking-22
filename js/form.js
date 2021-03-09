import {ACCURACY} from './data.js'
// inactive state of the card

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const formElement = form.querySelectorAll('fieldset');
const mapFiltersElement = mapFilters.querySelectorAll('select, fieldset');
const address = form.querySelector('#address');

const fillAddress = function ({lat, lng}) {
  const lattitude = lat.toFixed(ACCURACY);
  const longitude = lng.toFixed(ACCURACY);
  address.readOnly = true;
  address.value = `${lattitude} ${longitude}`;
}

let className = null;
const changeClass = function () {
  formElement ? className = 'ad-form--disabled' : className = 'map__filters--disabled';
}

const inactivateForm = function(form, setElements) {
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

export {
  disableForm,
  enableForm,
  fillAddress
}
