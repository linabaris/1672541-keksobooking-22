const offersTemplate = document.querySelector('#card').content;

const redefineType = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
  }
}

const createOfferCard = function ({ author, offer }) {
  const cardElement = offersTemplate.cloneNode(true);


  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price;
  cardElement.querySelector('.popup__type').textContent = redefineType(offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.chekin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const genFeatures = function (arrFeatures) {
    const featuresPopup = cardElement.querySelector('.popup__features');
    featuresPopup.innerHTML = '';

    if (arrFeatures.length === 0) {
      featuresPopup.classList.add('visvisually-hidden')
    } else {
      arrFeatures.forEach((elem) => {

        const newFeature = document.createElement('li');
        newFeature.className = `popup__feature popup__feature--${elem}`;
        featuresPopup.appendChild(newFeature);
      })
      return featuresPopup;
    }
  }

  const genPhotos = function (arrPhotos) {
    const photosPopup = cardElement.querySelector('.popup__photos');
    photosPopup.innerHTML = '';


    if (arrPhotos.length === 0) {
      photosPopup.classList.add('visually-hidden');
    } else {

      arrPhotos.forEach((elem) => {

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
  }

  genFeatures(offer.features);
  genPhotos(offer.photos);

  return cardElement;

}

export {
  createOfferCard
}
