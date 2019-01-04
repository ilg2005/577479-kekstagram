'use strict';

(function () {
  window.filtersElement = document.querySelector('.img-filters');
  var filterPopularElement = window.filtersElement.querySelector('#filter-popular');
  var filterNewElement = window.filtersElement.querySelector('#filter-new');
  var filterDiscussedElement = window.filtersElement.querySelector('#filter-discussed');

  var setActiveFilter = function (element) {
    element.classList.add('img-filters__button--active');
  };

  var resetFilters = function () {
    var activeFilterElement = window.filtersElement.querySelector('.img-filters__button--active');
    if (activeFilterElement) {
      activeFilterElement.classList.remove('img-filters__button--active');
    }
  };

  var filterPopularElementClickHandler = function() {
    resetFilters();
    setActiveFilter(filterPopularElement);

  };

  var filterNewElementClickHandler = function() {
    resetFilters();
    setActiveFilter(filterNewElement);

  };

  var filterDiscussedElementClickHandler = function() {
    resetFilters();
    setActiveFilter(filterDiscussedElement);

  };

  filterPopularElement.addEventListener('click', filterPopularElementClickHandler);
  filterNewElement.addEventListener('click', filterNewElementClickHandler);
  filterDiscussedElement.addEventListener('click', filterDiscussedElementClickHandler);

})();
