'use strict';

(function () {
  var MESSAGE_TIMEOUT = 1000;

  var createArrayFromRange = function (min, max) {
    var numbers = [];
    for (var i = min; i <= max; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  var getRandomIndex = function (array) {
    return Math.round(Math.random() * (array.length - 1));
  };

  var getRandomValue = function (array) {
    return array[getRandomIndex(array)];
  };

  var removeServerMessage = function (element, timeout) {
    setTimeout(function () {
      element.remove();
    }, timeout);
  };

  window.utilities = {
    MULTIPLICAND: 100,
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    },
    getRandomInRange: function (min, max) {
      var array = createArrayFromRange(min, max);
      return getRandomValue(array);
    },
    renderSuccessMessage: function (message) {
      var successMessageElement = document.createElement('div');
      successMessageElement.style = 'z-index: 100; width: 300px; min-height: 50px; border-radius: 50px; margin: auto; text-align: center; background-color: green';
      successMessageElement.style.display = 'inline-flex';
      successMessageElement.style.justifyContent = 'center';
      successMessageElement.style.alignItems = 'center';
      successMessageElement.style.position = 'fixed';
      successMessageElement.style.top = '50%';
      successMessageElement.style.bottom = '50%';
      successMessageElement.style.left = 0;
      successMessageElement.style.right = 0;
      successMessageElement.style.fontSize = '18px';

      successMessageElement.textContent = message;
      document.body.insertAdjacentElement('afterbegin', successMessageElement);

      removeServerMessage(successMessageElement, MESSAGE_TIMEOUT);
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
