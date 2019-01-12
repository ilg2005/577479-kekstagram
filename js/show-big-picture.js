'use strict';

(function () {
  var COMMENTS_NUMBER_TO_SHOW = 5;
  var selectedPicture;
  var restComments;

  var bigPictureElement = document.querySelector('.big-picture');
  var cancelPreviewElement = bigPictureElement.querySelector('#picture-cancel');
  var inputCommentElement = bigPictureElement.querySelector('.social__footer-text');
  var buttonSendCommentElement = bigPictureElement.querySelector('.social__footer-btn');
  var commentsElement = bigPictureElement.querySelector('.social__comments');
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

  var commentsLoaderElementClickHandler = function () {
    showComments(restComments, selectedPicture);
  };

  var showComments = function (currentCommentsArray, currentPicture) {
    if (currentCommentsArray.length > COMMENTS_NUMBER_TO_SHOW) {
      restComments = currentCommentsArray.splice(COMMENTS_NUMBER_TO_SHOW);
      commentsElement.appendChild(generateCommentsFragment(currentCommentsArray));
      commentsCounterElement.innerHTML = '';
      commentsCounterElement.innerText = (currentPicture.comments.length - restComments.length) + ' из ' + currentPicture.comments.length + ' комментариев';
      window.utilities.showElement(commentsCounterElement);
      window.utilities.showElement(commentsLoaderElement);
      commentsLoaderElement.addEventListener('click', commentsLoaderElementClickHandler);
    } else {
      commentsCounterElement.innerHTML = '';
      commentsCounterElement.innerText = currentPicture.comments.length + ' из ' + currentPicture.comments.length + ' комментариев';
      commentsElement.appendChild(generateCommentsFragment(currentCommentsArray));
      window.utilities.hideElement(commentsLoaderElement);
    }
  };

  var generateBigPictureData = function (picture) {
    selectedPicture = picture;
    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.big-picture__img img').alt = 'Фотография из галереи';
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    commentsElement.innerHTML = '';

    restComments = picture.comments.slice();
    showComments(restComments, picture);
  };

  var cancelPreview = function () {
    window.utilities.hideElement(bigPictureElement);
    inputCommentElement.value = '';
  };

  var documentKeydownTabHandler = function (evt) {
    if (window.utilities.isTabEvent(evt)) {
      evt.preventDefault();
      cancelPreviewElement.focus();
      document.removeEventListener('keydown', documentKeydownTabHandler);
    }
  };

  var buttonSendCommentElementBlurHandler = function () {
    cancelPreviewElement.focus();
  };

  var setListenersOnBigPictureShow = function () {
    document.addEventListener('keydown', documentKeydownEscHandler);
    document.addEventListener('keydown', documentKeydownTabHandler);
    cancelPreviewElement.addEventListener('click', cancelPreviewElementClickHandler);
    buttonSendCommentElement.addEventListener('blur', buttonSendCommentElementBlurHandler);
  };

  var picturesElementClickHandler = function (evt) {
    if (evt.target.className === 'picture__img') {
      generateBigPictureData(window.filters.currentData[evt.target.id]);
      document.querySelector('body').classList.add('modal-open');
      window.utilities.showElement(bigPictureElement);
      setListenersOnBigPictureShow();
    }
  };

  var picturesElementKeydownEnterHandler = function (evt) {
    if (window.utilities.isEnterEvent(evt) && evt.target.className === 'picture') {
      generateBigPictureData(window.filters.currentData[evt.target.firstElementChild.id]);
      document.querySelector('body').classList.add('modal-open');
      window.utilities.showElement(bigPictureElement);
      setListenersOnBigPictureShow();
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
