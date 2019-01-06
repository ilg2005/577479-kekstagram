'use strict';

(function () {
  var NEW_PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;

  var timerID;

  var filtersElement = document.querySelector('.img-filters');
  var filterPopularElement = filtersElement.querySelector('#filter-popular');
  var filterNewElement = filtersElement.querySelector('#filter-new');
  var filterDiscussedElement = filtersElement.querySelector('#filter-discussed');

  var shuffleArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      var randomIndex = Math.round(Math.random() * (array.length - 1));
      var temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  };

  var setNewActiveFilter = function (filterElement) {
    var activeFilterElement = filtersElement.querySelector('.img-filters__button--active');
    if (activeFilterElement) {
      activeFilterElement.classList.remove('img-filters__button--active');
    }
    filterElement.classList.add('img-filters__button--active');
  };

  var removeFormerPictures = function () {
    var formerPictures = document.querySelectorAll('.picture');
    formerPictures.forEach(function (node) {
      node.remove();
    });
  };

  var updatePictures = function (newDataArray) {
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      removeFormerPictures();
      window.pictures.renderPictures(newDataArray);
    }, DEBOUNCE_INTERVAL);
  };

  var filterPopularElementClickHandler = function () {
    setNewActiveFilter(filterPopularElement);
    window.filters.currentData = window.pictures.initialData;
    updatePictures(window.filters.currentData);
  };

  var filterNewElementClickHandler = function () {
    setNewActiveFilter(filterNewElement);
    var dataCopy = window.pictures.initialData.slice();
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      removeFormerPictures();
      window.filters.currentData = shuffleArray(dataCopy).splice(0, NEW_PICTURES_AMOUNT);
      window.pictures.renderPictures(window.filters.currentData);
    }, DEBOUNCE_INTERVAL);
  };

  var filterDiscussedElementClickHandler = function () {
    setNewActiveFilter(filterDiscussedElement);
    var dataCopy = window.pictures.initialData.slice();
    window.filters.currentData = dataCopy.sort(function (picture1, picture2) {
      return (picture2.comments.length - picture1.comments.length);
    });
    updatePictures(window.filters.currentData);
  };

  filterPopularElement.addEventListener('click', filterPopularElementClickHandler);
  filterNewElement.addEventListener('click', filterNewElementClickHandler);
  filterDiscussedElement.addEventListener('click', filterDiscussedElementClickHandler);

  window.filters = {
    filtersElement: filtersElement,
    currentData: []
  };
})();
