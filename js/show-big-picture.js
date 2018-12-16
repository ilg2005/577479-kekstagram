'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');

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
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));

    window.utilities.hideElement(bigPictureElement.querySelector('.social__comment-count'));
    window.utilities.hideElement(bigPictureElement.querySelector('.comments-loader'));
  };

  var documentClickHandler = function () {

  };

  var init = function () {
    document.addEventListener('click', documentClickHandler);
    generateBigPictureData(window.gallery[0]);
    window.utilities.showElement(bigPictureElement);
  };

  init();
})();
