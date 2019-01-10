'use strict';

(function () {
  var MESSAGE_TIMEOUT = 3000;
  var Keycode = {
    ENTER: 13,
    ESC: 27,
    TAB: 9,
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39
  };

  var removeMessage = function (element, timeout) {
    setTimeout(function () {
      element.remove();
    }, timeout);
  };

  window.utilities = {
    MULTIPLICAND: 100,
    isEnterEvent: function (evt) {
      return (evt.keyCode === Keycode.ENTER);
    },
    isEscEvent: function (evt) {
      return (evt.keyCode === Keycode.ESC);
    },
    isTabEvent: function (evt) {
      return (evt.keyCode === Keycode.TAB);
    },
    isArrowLeftEvent: function (evt) {
      return (evt.keyCode === Keycode.ARROW_LEFT);
    },
    isArrowRightEvent: function (evt) {
      return (evt.keyCode === Keycode.ARROW_RIGHT);
    },
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    renderErrorMessage: function (message) {
      var errorMessageElement = document.createElement('p');
      errorMessageElement.classList.add('error');
      errorMessageElement.classList.add('error__inner');
      errorMessageElement.style = 'zIndex: 100; width: 550px; margin: 220px auto; padding-top: 40px; text-align: center; background-color: rgb(255, 0, 0); fontSize: 20px; color: rgb(255, 255, 255);';
      errorMessageElement.textContent = message;
      document.querySelector('.img-upload__start').insertAdjacentElement('beforeend', errorMessageElement);
      removeMessage(errorMessageElement, MESSAGE_TIMEOUT);
    }
  };
})();
