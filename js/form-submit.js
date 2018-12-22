'use strict';

(function () {
  var formElement = document.querySelector('.img-upload__form');

  var successSaveHandler = function () {
    console.log('Сохранено успешно!');
  };

  var errorSaveHandler = function (message) {
    console.log(message);
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      console.log(evt);
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
