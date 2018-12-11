'use strict';

(function () {
  window.utilities = {
    MULTIPLICAND: 100,
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    }
  };
})();
