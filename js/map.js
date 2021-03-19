import { similarOffers } from './data.js';
import { createOfferCard } from './popup.js';
import { fillAddress } from './form.js'

const defaultCoords = {
  lat: 35.68950,
  lng: 139.69171,
}

/* global L:readonly */
const fillMap = function (map) {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [45, 45],
    iconAnchor: [45/2, 45],
  });

  const mainMarker = L.marker(
    {
      lat: 35.68950,
      lng: 139.69171,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  fillAddress(defaultCoords);
  const onMove = function (evt) {
    const address = {
      lat: evt.target.getLatLng().lat,
      lng: evt.target.getLatLng().lng,
    }
    fillAddress(address);
  }

  mainMarker.on('move', onMove);

  const adCards = similarOffers;
  adCards.forEach(({ author, offer, location }) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40 / 2, 40],
    });
    const lat = location.x;
    const lng = location.y;
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });

    marker
      .addTo(map)
      .bindPopup(
        createOfferCard({author, offer}), {
          keepInView: true,
        },
      );
  });
  return map;
}
export { fillMap };
