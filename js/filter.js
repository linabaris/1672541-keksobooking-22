
import { generatePins, markersArr} from './map.js';
import { mapFilters } from './form.js'


const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const HIGH_PRICE = 'high';
const LOW_PRICE = 'low';
const MIDDLE_PRICE = 'middle';
const NOT_SELECTED = 'any';
// const RENDER_DELAY = 500;

const PRICE_LIST = {
  high: 50000,
  low: 10000,
}


const checkHousingType = function (card) {
  return housingType.value === card.offer.type || housingType.value === 'any';
  // if (card.offer.type === housingType.value) {
  // }
}

const checkHousingRooms = function (card) {
  return housingRooms.value == card.offer.rooms || housingRooms.value === 'any';
}

const checkHousingGuests = function (card) {
  return housingGuests.value == card.offer.guests || housingGuests.value === 'any';
}

const checkHousingPrice = function (card) {
  switch (housingPrice.value) {
    case HIGH_PRICE:
      return card.offer.price >= PRICE_LIST.high;
    case MIDDLE_PRICE:
      return (card.offer.price < 50000 && card.offer.price > 10000);
    case LOW_PRICE:
      return card.offer.price <= PRICE_LIST.low;
    case NOT_SELECTED:
      return true;
  }
}

const checkHousingFeatures = function (card) {
  const checkedFeatures = housingFeatures.querySelectorAll('input:checked');

  if (checkedFeatures.length === 0) {
    return true;
  }

  for (const feature of checkedFeatures) {
    if (!card.offer.features.includes(feature)) {
      return false;
    }
  }
  return true;
}

const filterAllParametrs = (offersArr) => {
  let filterOffersArr = [];

  for (let card of offersArr) {
    if (checkHousingGuests(card) &&
      checkHousingPrice(card) &&
      checkHousingType(card) &&
      checkHousingRooms(card) &&
      checkHousingFeatures(card)) {
      filterOffersArr.push(card);
    }
  }
  return filterOffersArr;
}

const updateOffersMap = (data) => {
  markersArr.forEach((marker) => marker.remove());
  const filteredOffers = filterAllParametrs(data);
  generatePins(filteredOffers);

}


const setFilterOffers = (data) => {
  mapFilters.addEventListener('change', () => {
    updateOffersMap(data);
  })
}



export {setFilterOffers};
