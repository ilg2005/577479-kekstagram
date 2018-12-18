'use strict';

(function () {
  var MAX_HASHTAGS_NUMBER = 5;

  var hashtagsElement = document.querySelector('.text__hashtags');

  var getHashtagsArray = function () {
    var hashtagsString = hashtagsElement.value;
    hashtagsString = hashtagsString.trim();
    var hashtagsArray = hashtagsString.split(' ');
    return hashtagsArray;
  };

  var checkIfTooMuchHashtags = function (hashtagsArray) {
    hashtagsElement.setCustomValidity('');
    if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      hashtagsElement.setCustomValidity('Нельзя указывать более пяти хэш-тегов');
    }
  };

  /*
  var checkDoubleOccurrence = function (hashtagsArray) {
    hashtagsElement.setCustomValidity('');
    var tempStorage = [];
    hashtagsArray.forEach(function (hashtag) {
      if (tempStorage.indexOf(hashtag) === -1) {
        tempStorage.push(hashtag);
      } else {
        hashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      }
    });
  };

  var checkIfStartsWithHashSymbol = function (hashtag) {
    hashtagsElement.setCustomValidity('');
    if (hashtag.match(/(^#)/) === null) {
      hashtagsElement.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
    }
  };

  var checkIfContainsOtherSymbols = function (hashtag) {
    hashtagsElement.setCustomValidity('');
    if (hashtag.match(/(^#.+)/) === null) {
      hashtagsElement.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    }
  };

  var checkIfContainsAnotherHashSymbol = function (hashtag) {
    hashtagsElement.setCustomValidity('');
    if (hashtag.match(/(^#[^#]+)/) === null) {
      hashtagsElement.setCustomValidity('Хэш-теги должны разделяться пробелами');
    }
  };

  var checkIfTooLong = function (hashtag) {
    hashtagsElement.setCustomValidity('');
    if (hashtag.match(/[^#]{1,19}/) === null) {
      hashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега должна быть 20 символов, включая решётку');
    }
  };
*/

  var hastagsElementBlurHandler = function () {
    var hashtags = getHashtagsArray();

    checkIfTooMuchHashtags(hashtags);
    hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);

    /*
    checkDoubleOccurrence(hashtags);

    hashtags.forEach(function (hashtag) {
      checkIfStartsWithHashSymbol(hashtag);
      checkIfContainsOtherSymbols(hashtag);
      checkIfContainsAnotherHashSymbol(hashtag);
      checkIfTooLong(hashtag);
    });
*/

  };

  var hastagsElementChangeHandler = function () {
    hashtagsElement.setCustomValidity('');
  };

  hashtagsElement.addEventListener('change', hastagsElementChangeHandler);
  hashtagsElement.addEventListener('blur', hastagsElementBlurHandler);
})();
