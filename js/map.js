import { getServerData } from './server.js'
import { createOfferCard } from './popup.js';
import { fillAddress, disableForm, enableForm } from './form.js'
import { showAlert } from './util.js'

disableForm();

const defaultCoords = {
  lat: 35.68950,
  lng: 139.69171,
}

/* global L:readonly */

const map = L.map('map-canvas')
  .on('load', () => { enableForm() })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
  }, 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [45, 45],
  iconAnchor: [45 / 2, 45],
});

const mainMarker = L.marker({
  lat: 35.68950,
  lng: 139.69171,
}, {
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

const generatePins = async function () {
  let offersArr = [];
  try {
    offersArr = await getServerData();
  } catch (err) {
    showAlert('При загрузке данных с сервера произошла ошибка');
  }

  offersArr.forEach((elem) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40 / 2, 40],
    });
    const lat = elem.location.lat;
    const lng = elem.location.lng;
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });

    marker
      .addTo(map)
      .bindPopup(
        createOfferCard(elem), {
          keepInView: true,
        },
      );
  });
}
generatePins();

const resetMap = function () {
  map.setView({
    lat: 35.68950,
    lng: 139.69171,
  });
  mainMarker.setLatLng({
    lat: 35.68950,
    lng: 139.69171,
  });
}

export { resetMap }
