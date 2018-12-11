'use strict';

(function () {
  window.utilities = {
    showElement: function (element) {
      element.classList.remove('hidden');
    },
    hideElement: function (element) {
      element.classList.add('hidden');
    }
  };
})();
