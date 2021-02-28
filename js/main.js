/* global L:readonly */
import {disableForm, enableForm} from './form.js'
import { fillMap } from './map.js';

disableForm();

const map = L.map('map-canvas')
  .on('load', () => {enableForm()} )
  .setView ({
    lat: 35.68950,
    lng: 139.69171,
  }, 13);
fillMap(map);
