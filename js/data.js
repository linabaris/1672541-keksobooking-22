import {
  getRandomIntegerInclusive,
  getRandomFloatInclusive,
  getMixedArr
} from './util.js'

const TITLE = 'Объявление о сдаче недвижимости.';
const HOUSE_DESCRIPTION = 'Самое выгодное предложение!';
const USER_NUMBER_MIN = 1;
const USER_NUMBER_MAX = 8;
const PRICE_MIN = 1;
const PRICE_MAX = 10000;
const ROMMS_NUMBER_MIN = 1;
const ROOMS_NUMBER_MAX = 7;
const GUESTS_NUMBER_MIN = 1;
const GUESTS_NUMBER_MAX = 10;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX =  35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;
const ACCURACY = 5;
const OFFERS_COUNT = 10;


const HOUSE_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECK_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const AVAILABLE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const createOffer = function () {
  const X = getRandomFloatInclusive(LATITUDE_MIN, LATITUDE_MAX, ACCURACY);
  const Y = getRandomFloatInclusive(LONGITUDE_MIN, LONGITUDE_MAX, ACCURACY);
  const ad = {
    author: {
      avatar: `img/avatars/user0${getRandomIntegerInclusive(USER_NUMBER_MIN, USER_NUMBER_MAX)}.png`,
    },
    offer: {
      title: TITLE,
      address: `${X},${Y}`,
      price: getRandomIntegerInclusive(PRICE_MIN,PRICE_MAX),
      type: HOUSE_TYPES[getRandomIntegerInclusive(0, HOUSE_TYPES.length-1)],
      rooms: getRandomIntegerInclusive(ROMMS_NUMBER_MIN, ROOMS_NUMBER_MAX),
      guests: getRandomIntegerInclusive(GUESTS_NUMBER_MIN, GUESTS_NUMBER_MAX),
      chekin: CHECK_TIMES[getRandomIntegerInclusive(0,CHECK_TIMES.length-1)],
      checkout: CHECK_TIMES[getRandomIntegerInclusive(0,CHECK_TIMES.length-1)],
      features: getMixedArr(AVAILABLE_FEATURES),
      description: HOUSE_DESCRIPTION,
      photos: getMixedArr(HOUSE_PHOTOS),
    },
    location: {
      x: X,
      y: Y,
    },
  }
  return ad;
}
const similarOffers = new Array(OFFERS_COUNT).fill(null).map(() => createOffer());

export {
  similarOffers,
  ACCURACY
}
