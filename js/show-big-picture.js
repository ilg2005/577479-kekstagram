'use strict';

(function () {
  var COMMENTS_NUMBER_TO_SHOW = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var cancelPreviewElement = bigPictureElement.querySelector('#picture-cancel');
  var inputCommentElement = bigPictureElement.querySelector('.social__footer-text');
  var commentsCounterElement = bigPictureElement.querySelector('.social__comment-count');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  var generateCommentsFragment = function (comments) {
    var commentsFragment = document.createDocumentFragment();

    comments.forEach(function (comment) {
      var newLi = document.createElement('li');
      newLi.classList.add('social__comment');

      var newImg = document.createElement('img');
      newImg.classList.add('social__picture');
      newImg.src = comment.avatar;
      newImg.alt = 'Аватар комментатора фотографии';
      newImg.width = '35';
      newImg.height = '35';
      newLi.appendChild(newImg);

      var newP = document.createElement('p');
      newP.classList.add('social__text');
      newP.textContent = comment.message;
      newLi.appendChild(newP);

      commentsFragment.appendChild(newLi);
    });
    return commentsFragment;
  };

  var generateBigPictureData = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.big-picture__img img').alt = 'Фотография из галереи';
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    if (picture.comments.length > COMMENTS_NUMBER_TO_SHOW) {
      var commentsToLoad = picture.comments.splice(COMMENTS_NUMBER_TO_SHOW);
      bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));
      window.utilities.showElement(commentsCounterElement);
      window.utilities.showElement(commentsLoaderElement);
    } else {
      bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));
      window.utilities.hideElement(commentsCounterElement);
      window.utilities.hideElement(commentsLoaderElement);
    }
  };

  var cancelPreview = function () {
    window.utilities.hideElement(bigPictureElement);
  };

  var picturesElementClickHandler = function (evt) {
    if (evt.target.className === 'picture__img') {
      generateBigPictureData(window.pictures.data[evt.target.id]);
      document.querySelector('body').classList.add('modal-open');
      window.utilities.showElement(bigPictureElement);

      document.addEventListener('keydown', documentKeydownEscHandler);
      cancelPreviewElement.addEventListener('click', cancelPreviewElementClickHandler);
    }
  };

  var picturesElementKeydownEnterHandler = function (evt) {
    if (window.utilities.isEnterEvent(evt) && evt.target.className === 'picture') {
      generateBigPictureData(window.pictures.data[evt.target.firstElementChild.id]);
      document.querySelector('body').classList.add('modal-open');
      window.utilities.showElement(bigPictureElement);

      document.addEventListener('keydown', documentKeydownEscHandler);
      cancelPreviewElement.addEventListener('click', cancelPreviewElementClickHandler);
    }
  };

  var cancelPreviewElementClickHandler = function () {
    cancelPreview();
    cancelPreviewElement.removeEventListener('click', cancelPreviewElementClickHandler);
  };

  var documentKeydownEscHandler = function (evt) {
    if (window.utilities.isEscEvent(evt) && evt.target !== inputCommentElement) {
      cancelPreview();
      document.removeEventListener('keydown', documentKeydownEscHandler);
    }
  };

  window.pictures.picturesElement.addEventListener('click', picturesElementClickHandler);
  window.pictures.picturesElement.addEventListener('keydown', picturesElementKeydownEnterHandler);
})();
