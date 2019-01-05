'use strict';

(function () {
  var pictureTemplateElement = document.querySelector('#picture').content;
  var picturesElement = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplateElement.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var renderPictures = function (picturesArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesArray.length; i++) {
      pictureTemplateElement.querySelector('.picture__img').id = i;
      fragment.appendChild(renderPicture(picturesArray[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var successLoadHandler = function (data) {
    window.pictures.initialData = data;
    window.filters.currentData = data;
    window.filters.filtersElement.classList.remove('img-filters--inactive');
    renderPictures(data);
  };

  var errorLoadHandler = function (serverResponse) {
    window.utilities.renderErrorMessage(serverResponse);
  };

  window.backend.load(successLoadHandler, errorLoadHandler);

  window.pictures = {
    initialData: [],
    picturesElement: picturesElement,
    renderPictures: renderPictures
  };
})();
