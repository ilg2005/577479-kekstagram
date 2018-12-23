'use strict';

(function () {
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

    var successButtonElementClickHandler = function () {
      successSaveElement.remove();
    };

    successButtonElement.addEventListener('click', successButtonElementClickHandler);
  };

  var successSaveHandler = function () {
    window.imageUpload.cancelImageEditing();
    clearTextFields();
    renderSuccessSaveElement();
  };

  var errorSaveHandler = function (message) {
    // console.log(message);
  };

  window.formSubmit = {
    formElement: formElement,
    formSubmitHandler: function (evt) {
      evt.preventDefault();
      window.backend.save(new FormData(formElement), successSaveHandler, errorSaveHandler);
    }
  };
})();
