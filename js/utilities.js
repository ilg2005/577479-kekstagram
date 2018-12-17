'use strict';

(function () {
  var MESSAGE_TIMEOUT = 1000;

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
    createArrayFromRange: function (min, max) {
      var numbers = [];
      for (var i = min; i <= max; i++) {
        numbers.push(i);
      }
      return numbers;
    },
    getRandomIndex: function (array) {
      return Math.round(Math.random() * (array.length - 1));
    },
    getRandomValue: function (array) {
      return array[this.getRandomIndex(array)];
    },
    getRandomInRange: function (min, max) {
      var array = this.createArrayFromRange(min, max);
      return this.getRandomValue(array);
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
