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

  var renderGallery = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesElement.appendChild(fragment);
  };

  var successLoadHandler = function (data) {
    window.gallery = data;
    renderGallery(data);
  };

  var errorLoadHandler = function (serverResponse) {
    window.utilities.renderErrorMessage(serverResponse);
  };

  window.backend.load(successLoadHandler, errorLoadHandler);
})();
