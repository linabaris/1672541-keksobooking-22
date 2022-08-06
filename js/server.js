const getServerData = function (getDataSuccsess, getDataFail) {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      getDataSuccsess(data);
    })
    .catch (() => {
      getDataFail();
    })
};

const sendData = function (onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {
  getServerData,
  sendData
}
