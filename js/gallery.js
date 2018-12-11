'use strict';

(function () {
  var pictureNumbers;
  var pictureTemplateElement = document.querySelector('#picture').content;
  var picturesElement = document.querySelector('.pictures');

  var getUniqueRandomValue = function (array) {
    var uniqueRandomValue = window.utilities.getRandomValue(array);
    array.splice(array.indexOf(uniqueRandomValue), 1);
    return uniqueRandomValue;
  };

  var generateCommentsForPicture = function (commentsArray) {
    var commentsClone = commentsArray.slice();
    var commentsNumber = window.utilities.getRandomIndex(commentsClone);
    var commentsForPicture = [];
    if (commentsNumber !== 0) {
      for (var i = 0; i <= commentsNumber; i++) {
        commentsForPicture.push(getUniqueRandomValue(commentsClone));
      }
    }
    return commentsForPicture;
  };

  var createPicture = function () {
    var picture = {
      url: 'photos/' + getUniqueRandomValue(pictureNumbers) + '.jpg',
      likes: window.utilities.getRandomInRange(window.consts.MIN_LIKES_NUM, window.consts.MAX_LIKES_NUM),
      comments: generateCommentsForPicture(window.consts.COMMENTS),
      description: window.utilities.getRandomValue(window.consts.SENTENCES)
    };
    return picture;
  };

  var createPicturesArray = function (picturesNum) {
    var pictures = [];
    for (var i = 0; i < picturesNum; i++) {
      pictures.push(createPicture());
    }
    return pictures;
  };

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

  var init = function () {
    pictureNumbers = window.utilities.createArrayFromRange(window.consts.MIN_PICTURE_NUM, window.consts.MAX_PICTURE_NUM);
    window.gallery = createPicturesArray(window.consts.MAX_PICTURE_NUM);
    renderGallery(window.gallery);
  };

  init();
})();
