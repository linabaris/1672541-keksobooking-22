import { createOfferCard } from './popup.js';
import { fillAddress, disableForm, enableForm } from './form.js'

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


let markersArr = [];
const generatePins = (offersArr) => {
  offersArr.forEach((elem) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [40 / 2, 40],
    });
    const lat = elem.location.lat;
    const lng = elem.location.lng;
    const pin = L.marker({
      lat,
      lng,
    }, {
      icon,
    });
    markersArr.push(pin);
    pin
      .addTo(map)
      .bindPopup(
        createOfferCard(elem), {
          keepInView: true,
          closeOnEscapeKey: true,
        },
      );
  });
}



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


export { resetMap, generatePins, markersArr }
