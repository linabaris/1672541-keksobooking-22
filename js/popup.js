const offersTemplate = document.querySelector('#card').contents;

const cardElement = offersTemplate.cloneNode(true).content;

const titlePopup = cardElement.querySelector('.popup__title');
const addressPopup = cardElement.querySelector('.popup__text--address');
const pricePopup = cardElement.querySelector('.popup__text--price');
const typePopup = cardElement.querySelector('.popup__type');
const capacityPopup = cardElement.querySelector('.popup__text--capacity');
const checkPopup = cardElement.querySelector('.popup__text--time');
const descriptionPopup = cardElement.querySelector('.popup__description');
const avatarPopup = cardElement.querySelector('.popup__avatar');

const redefineType = function (type) {
  switch (type) {
    case 'palace' :
      return 'Дворец';
    case 'flat' :
      return 'Квартира';
    case 'house' :
      return 'Дом';
    case 'bungalow' :
      return 'Бунгало';
  }
}

const genFeatures = function (arrFeatures) {
  const featuresPopup = cardElement.querySelector('.popup__features');
  featuresPopup.innerHTML = '';

  arrFeatures.forEach ((elem) => {
    const newFeature = document.createElement('li');
    newFeature.className = `popup__feature popup__feature--${elem}`;
    featuresPopup.appendChild(newFeature);
  })
  return featuresPopup;
}

const genPhotos = function (arrPhotos) {
  const photosPopup = cardElement.querySelector('.popup__photos');
  photosPopup.innerHTML = '';

  arrPhotos.forEach ((elem) => {
    const newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.src = elem;
    newPhoto.width = '45';
    newPhoto.height = '45';
    newPhoto.alt = 'Фотография жилья';
    photosPopup.appendChild(newPhoto);
  })
  return photosPopup;
}

const createofferCard = function ({author, offer}) {

  titlePopup.textContent = offer.title;
  addressPopup.textContent = offer.address;
  pricePopup.textContent = offer.price;
  checkPopup.textContent = `Заезд после ${offer.chekin}, выезд до ${offer.checkout}`;
  descriptionPopup.textContent = offer.description;
  typePopup.textContent = redefineType(offer.type);
  capacityPopup.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  avatarPopup.src = author.avatar;


  genFeatures(offer.features);
  genPhotos(offer.photos);

  return cardElement;
}

export {
  createofferCard
}
