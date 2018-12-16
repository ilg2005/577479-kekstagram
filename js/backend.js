'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SERVER_RESPONSE_OK = 200;
  var LOADING_TIMEOUT = 10000;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = LOADING_TIMEOUT;

  xhr.addEventListener('load', function () {
    if (xhr.status === SERVER_RESPONSE_OK) {
      console.log(xhr.response);
    } else {
      console.log('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    console.log('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    console.log('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
  });

  xhr.open('GET', URL + '\/data');
  xhr.send();
})();
