'use strict';

(function () {
  var ESC_KEYCODE = 27;
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
      newImg.src = 'img/avatar-' + window.utilities.getRandomInRange(window.consts.MIN_AVATAR_NUM, window.consts.MAX_AVATAR_NUM) + '.svg';
      newImg.alt = 'Аватар комментатора фотографии';
      newImg.width = '35';
      newImg.height = '35';
      newLi.appendChild(newImg);

      var newP = document.createElement('p');
      newP.classList.add('social__text');
      newP.textContent = comment;
      newLi.appendChild(newP);

      commentsFragment.appendChild(newLi);
    });
    return commentsFragment;
  };

  var generateBigPictureData = function (picture) {
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));

    window.utilities.hideElement(bigPictureElement.querySelector('.social__comment-count'));
    window.utilities.hideElement(bigPictureElement.querySelector('.comments-loader'));
  };

  var cancelPreview = function () {
    window.utilities.hideElement(bigPictureElement);
  };

  var documentClickHandler = function (evt) {
    window.utilities.showElement(bigPictureElement);
    document.addEventListener('keydown', documentKeydownEscHandler);
    if (evt.target === cancelPreviewElement) {
      cancelPreview();
    }
  };

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== inputCommentElement) {
      cancelPreview();
      document.removeEventListener('keydown', documentKeydownEscHandler);
    }
  };

  var init = function () {
    document.addEventListener('click', documentClickHandler);
    window.gallery.forEach(function (picture) {
      generateBigPictureData(picture);
    });
  };

  init();
})();
