'use strict';

(function () {
  var formElement = document.querySelector('.img-upload__form');
  var formSubmitElement = formElement.querySelector('#upload-submit');
  var successSaveTemplateElement = document.querySelector('#success').content;
  var errorSaveTemplateElement = document.querySelector('#error').content;

  var renderErrorSaveElement = function () {
    document.querySelector('main').appendChild(errorSaveTemplateElement);
    var errorSaveElement = document.querySelector('.error');
    var errorButton1Element = errorSaveElement.querySelectorAll('.error__button')[0];
    var errorButton2Element = errorSaveElement.querySelectorAll('.error__button')[1];
    window.utilities.showElement(errorSaveElement);
    errorButton1Element.focus();

    var documentClickHandler = function (evt) {
      if (evt.target !== errorButton2Element) {
        window.utilities.hideElement(errorSaveElement);
        document.removeEventListener('click', documentClickHandler);
      } else {
        window.utilities.hideElement(errorSaveElement);
        window.imageUpload.cancelImageEditing();
        window.imageUpload.uploadFileElement.click();
        document.removeEventListener('click', documentClickHandler);
      }
    };

    var errorButton1ElementKeydownHandler = function (evt) {
      if (window.utilities.isEnterEvent(evt)) {
        evt.preventDefault();
        window.utilities.hideElement(errorSaveElement);
        formSubmitElement.focus();
      } else if (window.utilities.isTabEvent(evt)) {
        evt.preventDefault();
        errorButton2Element.focus();
      }
      errorButton1Element.removeEventListener('keypress', errorButton1ElementKeydownHandler);
    };

    var errorButton2ElementKeydownHandler = function (evt) {
      if (window.utilities.isEnterEvent(evt)) {
        window.utilities.hideElement(errorSaveElement);
        window.imageUpload.cancelImageEditing();
        window.imageUpload.uploadFileElement.click();
      } else if (window.utilities.isTabEvent(evt)) {
        evt.preventDefault();
        errorButton1Element.focus();
      }
      errorButton2Element.removeEventListener('keypress', errorButton2ElementKeydownHandler);
    };

    var documentKeydownEscHandler = function (evt) {
      if (window.utilities.isEscEvent(evt)) {
        window.utilities.hideElement(errorSaveElement);
      }
      document.removeEventListener('keydown', documentKeydownEscHandler);
    };

    document.addEventListener('click', documentClickHandler);
    errorButton1Element.addEventListener('keydown', errorButton1ElementKeydownHandler);
    errorButton2Element.addEventListener('keydown', errorButton2ElementKeydownHandler);
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
    formElement.reset();
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
