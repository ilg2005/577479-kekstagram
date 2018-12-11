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
      newImg.src = 'img/avatar-' + getRandomInRange(MIN_AVATAR_NUM, MAX_AVATAR_NUM) + '.svg';
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

    hideElement(bigPictureElement.querySelector('.social__comment-count'));
    hideElement(bigPictureElement.querySelector('.comments-loader'));
  };

  generateBigPictureData(window.gallery[0]);
  showElement(bigPictureElement);

})();
