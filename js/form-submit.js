'use strict';

(function () {
  var formElement = document.querySelector('.img-upload__form');

  var successSaveHandler = function () {
    window.utilities.hideElement(window.imageUpload.pictureEditingElement);
  };

  var errorSaveHandler = function (message) {
    console.log(message);
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
