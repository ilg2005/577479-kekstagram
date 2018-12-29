'use strict';

(function () {
  var COMMENTS_NUMBER_TO_SHOW = 5;

  var picturesElement = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');
  var cancelPreviewElement = bigPictureElement.querySelector('#picture-cancel');
  var inputCommentElement = bigPictureElement.querySelector('.social__footer-text');

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
    picture.comments.splice(COMMENTS_NUMBER_TO_SHOW);
    bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));

    window.utilities.hideElement(bigPictureElement.querySelector('.social__comment-count'));
    window.utilities.hideElement(bigPictureElement.querySelector('.comments-loader'));
  };

  var cancelPreview = function () {
    window.utilities.hideElement(bigPictureElement);
  };

  var picturesElementClickHandler = function (evt) {
    if (evt.target.className === 'picture__img') {
      generateBigPictureData(window.pictures[evt.target.id]);
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

  picturesElement.addEventListener('click', picturesElementClickHandler);
})();
