'use strict';

(function () {
  var ENTER_KEYCODE = 18;
  var ESC_KEYCODE = 27;

  var formElement = document.querySelector('.img-upload__form');
  var commentsElement = formElement.querySelector('.text__description');
  var successSaveTemplateElement = document.querySelector('#success').content;

  var clearTextFields = function () {
    window.hashtagsElement.value = '';
    commentsElement.value = '';
  };

  var renderSuccessSaveElement = function () {
    document.querySelector('main').appendChild(successSaveTemplateElement);
    var successSaveElement = document.querySelector('.success');
    var successButtonElement = successSaveElement.querySelector('.success__button');
    window.utilities.showElement(successSaveElement);

    var documentClickHandler = function () {
      window.utilities.hideElement(successSaveElement);
      document.removeEventListener('click', documentClickHandler);
    };

    var successButtonElementKeypressEnterHandler = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.utilities.hideElement(successSaveElement);
      }
    };

    var documentKeydownEscHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.utilities.hideElement(successSaveElement);
      }
      document.removeEventListener('keydown', documentKeydownEscHandler);
    };

    document.addEventListener('click', documentClickHandler);
    successButtonElement.addEventListener('keypress', successButtonElementKeypressEnterHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
  };

  var successSaveHandler = function () {
    window.imageUpload.cancelImageEditing();
    clearTextFields();
    renderSuccessSaveElement();
  };

  var errorSaveHandler = function () {
    return;
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
