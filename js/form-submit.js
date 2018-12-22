'use-strict';

(function () {
  var formElement = document.querySelector('.img-upload__form');
  var formSubmitElement = formElement.querySelector('.img-upload__submit');

  var successSaveHandler = function () {
    hideElement(window.utilities.setupElement);
    window.utilities.renderSuccessMessage('Сохранено успешно!');
  };

  var errorSaveHandler = function (message) {
    window.utilities.renderErrorMessage(message);
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitElement: formSubmitElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
