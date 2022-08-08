import { setFilterOffers } from './filter.js';
import { generatePins } from './map.js';
import { getServerData } from './server.js';
import { showAlert } from './util.js';

const getDataSuccsess = (data) => {
  let serverData = data;
  generatePins(serverData);
  setFilterOffers(serverData);
}

const getDataFail = () => {
  showAlert();
}

getServerData(getDataSuccsess, getDataFail);

