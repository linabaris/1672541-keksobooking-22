import {createofferCard} from './popup.js'
import {similarOffers} from './data.js'

const offersListElement = document.querySelector('.map__canvas');

offersListElement.appendChild(createofferCard(similarOffers[0]));
