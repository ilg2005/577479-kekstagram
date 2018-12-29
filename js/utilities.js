'use strict';

(function () {
  var MESSAGE_TIMEOUT = 1000;
  var ESC_KEYCODE = 27;

  var removeServerMessage = function (element, timeout) {
    setTimeout(function () {
      element.remove();
    }, timeout);
  };

  window.utilities = {
    MULTIPLICAND: 100,
    isEscEvent: function (evt) {
      return (evt.keyCode === ESC_KEYCODE);
    },
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    renderErrorMessage: function (message) {
      var errorMessageElement = document.createElement('p');
      errorMessageElement.style = 'z-index: 100; width: 1200px; min-height: 60px; margin: 20px auto; padding-top: 20px; text-align: center; background-color: rgb(255, 0, 0);';
      errorMessageElement.style.fontSize = '20px';

      errorMessageElement.textContent = message;
      document.querySelector('.page-footer').insertAdjacentElement('beforebegin', errorMessageElement);
      removeServerMessage(errorMessageElement, MESSAGE_TIMEOUT);
    }
  };
})();
