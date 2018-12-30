'use strict';

(function () {
  var formElement = document.querySelector('.img-upload__form');
  var commentsElement = formElement.querySelector('.text__description');
  var successSaveTemplateElement = document.querySelector('#success').content;
  var errorSaveTemplateElement = document.querySelector('#error').content;
  var formDefaultEffectElement = document.querySelector('#effect-none');
  var formEffectValueElement = document.querySelector('.effect-level__value');

  var clearForm = function () {
    formDefaultEffectElement.checked = true;
    formEffectValueElement.value = '';
    window.hashtagsElement.value = '';
    commentsElement.value = '';
  };

  var renderErrorSaveElement = function () {
    document.querySelector('main').appendChild(errorSaveTemplateElement);
    var errorSaveElement = document.querySelector('.error');
    var errorButtonElement = errorSaveElement.querySelector('.error__button');
    window.utilities.showElement(errorSaveElement);

    var documentClickHandler = function () {
      window.utilities.hideElement(errorSaveElement);
      document.removeEventListener('click', documentClickHandler);
    };

    var errorButtonElementKeypressEnterHandler = function () {
      if (window.utilities.isEnterEvent) {
        window.utilities.hideElement(errorSaveElement);
      }
      errorButtonElement.removeEventListener('keypress', errorButtonElementKeypressEnterHandler);
    };

    var documentKeydownEscHandler = function (evt) {
      if (window.utilities.isEscEvent(evt)) {
        window.utilities.hideElement(errorSaveElement);
      }
      document.removeEventListener('keydown', documentKeydownEscHandler);
    };

    document.addEventListener('click', documentClickHandler);
    errorButtonElement.addEventListener('keypress', errorButtonElementKeypressEnterHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
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

    var successButtonElementKeypressEnterHandler = function () {
      if (window.utilities.isEnterEvent) {
        window.utilities.hideElement(successSaveElement);
      }
      successButtonElement.removeEventListener('keypress', successButtonElementKeypressEnterHandler);
    };

    var documentKeydownEscHandler = function (evt) {
      if (window.utilities.isEscEvent(evt)) {
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
    clearForm();
    renderSuccessSaveElement();
  };

  var errorSaveHandler = function () {
    renderErrorSaveElement();
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
