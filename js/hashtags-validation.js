'use strict';

(function () {
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAGS_LENGTH = 20;

  var hashtagsElement = document.querySelector('.text__hashtags');

  var getHashtagsArray = function () {
    var hashtagsString = hashtagsElement.value;
    hashtagsString = hashtagsString.trim();
    var hashtagsArray = hashtagsString.split(' ');
    return hashtagsArray;
  };

  var checkIfTooMuchHashtags = function (hashtagsArray) {
    if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      hashtagsElement.setCustomValidity('Нельзя указывать более пяти хэш-тегов');
      hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
    }
  };

  var checkDoubleOccurrence = function (hashtagsArray) {
    var tempStorage = [];
    hashtagsArray.forEach(function (hashtag) {
      if (tempStorage.indexOf(hashtag) === -1) {
        tempStorage.push(hashtag);
      } else {
        hashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
      }
    });
  };


  var checkIfStartsWithHashSymbol = function (hashtag) {
    if (hashtag.match(/(^#)/) === null) {
      hashtagsElement.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
    }
  };

  var checkIfContainsOtherSymbols = function (hashtag) {
    if (hashtag === '#') {
      hashtagsElement.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
    }
  };

  var checkIfContainsAnotherHashSymbol = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.indexOf('#', 1) > 0) {
      hashtagsElement.setCustomValidity('Хэш-теги должны разделяться пробелами');
      hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
    }
  };

  var checkIfTooLong = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.length > MAX_HASHTAGS_LENGTH) {
      hashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега должна быть 20 символов, включая решётку');
      hashtagsElement.removeEventListener('blur', hastagsElementBlurHandler);
    }
  };

  var hastagsElementBlurHandler = function () {
    var hashtags = getHashtagsArray();

    checkIfTooMuchHashtags(hashtags);
    checkDoubleOccurrence(hashtags);

    hashtags.forEach(function (hashtag) {
      checkIfStartsWithHashSymbol(hashtag);
    });

    hashtags.forEach(function (hashtag) {
      checkIfContainsOtherSymbols(hashtag);
    });

    hashtags.forEach(function (hashtag) {
      checkIfContainsAnotherHashSymbol(hashtag);
    });

    hashtags.forEach(function (hashtag) {
      checkIfTooLong(hashtag);
    });
  };

  var hastagsElementChangeHandler = function () {
    hashtagsElement.setCustomValidity('');
    hashtagsElement.addEventListener('blur', hastagsElementBlurHandler);
  };

  hashtagsElement.addEventListener('change', hastagsElementChangeHandler);
  hashtagsElement.addEventListener('blur', hastagsElementBlurHandler);
})();
