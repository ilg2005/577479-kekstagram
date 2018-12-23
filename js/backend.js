'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var SERVER_RESPONSE_OK = 200;
  var LOADING_TIMEOUT = 10000;

  var prepareRequest = function (loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = LOADING_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_RESPONSE_OK) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
    return xhr;
  };

  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = prepareRequest(loadHandler, errorHandler);
      xhr.open('GET', URL + '\/data');
      xhr.send();
    },
    save: function (formData, loadHandler, errorHandler) {
      var xhr = prepareRequest(loadHandler, errorHandler);
      xhr.open('POST', URL);
      xhr.send(formData);
    }
  };
})();
