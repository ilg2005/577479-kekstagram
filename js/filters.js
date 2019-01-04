'use strict';

(function () {
  var NEW_PICTURES_AMOUNT = 10;
  var DEBOUNCE_INTERVAL = 500;

  window.filtersElement = document.querySelector('.img-filters');
  var filterPopularElement = window.filtersElement.querySelector('#filter-popular');
  var filterNewElement = window.filtersElement.querySelector('#filter-new');
  var filterDiscussedElement = window.filtersElement.querySelector('#filter-discussed');

  var getRandomIndex = function (array) {
    return Math.round(Math.random() * (array.length - 1));
  };

  var getRandomValue = function (array) {
    return array[getRandomIndex(array)];
  };

  var getUniqueRandomValue = function (array) {
    var uniqueRandomValue = getRandomValue(array);
    array.splice(array.indexOf(uniqueRandomValue), 1);
    return uniqueRandomValue;
  };

  var getUniqueRandomArray = function (sourceArray, targetArrayLength) {
    var targetArray = [];
    for (var i = 0; i < targetArrayLength; i++) {
      targetArray.push(getUniqueRandomValue(sourceArray));
    }
    return targetArray;
  };

  var setActiveFilter = function (element) {
    element.classList.add('img-filters__button--active');
  };

  var resetFilters = function () {
    var activeFilterElement = window.filtersElement.querySelector('.img-filters__button--active');
    if (activeFilterElement) {
      activeFilterElement.classList.remove('img-filters__button--active');
    }
    var renderedPictures = document.querySelectorAll('.picture');
    renderedPictures.forEach(function (node) {
      node.remove();
    });
  };

  var filterPopularElementClickHandler = function () {
    resetFilters();
    setActiveFilter(filterPopularElement);
    var timerID;
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      window.currentData = window.pictures.initialData.slice();
      window.pictures.renderPictures(window.currentData);
    }, DEBOUNCE_INTERVAL);

  };

  var filterNewElementClickHandler = function () {
    resetFilters();
    setActiveFilter(filterNewElement);
    var timerID;
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      var dataCopy = window.pictures.initialData.slice();
      window.currentData = getUniqueRandomArray(dataCopy, NEW_PICTURES_AMOUNT);
      window.pictures.renderPictures(window.currentData);
    }, DEBOUNCE_INTERVAL);
  };

  var filterDiscussedElementClickHandler = function () {
    resetFilters();
    setActiveFilter(filterDiscussedElement);
    var timerID;
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      var dataCopy = window.pictures.initialData.slice();
      window.currentData = dataCopy.sort(function (picture1, picture2) {
        if (picture1.comments.length < picture2.comments.length) {
          return 1;
        } else if (picture1.comments.length > picture2.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      window.pictures.renderPictures(window.currentData);
    }, DEBOUNCE_INTERVAL);
  };

  filterPopularElement.addEventListener('click', filterPopularElementClickHandler);
  filterNewElement.addEventListener('click', filterNewElementClickHandler);
  filterDiscussedElement.addEventListener('click', filterDiscussedElementClickHandler);

})();
