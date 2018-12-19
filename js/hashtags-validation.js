'use strict';

(function () {
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagsElement = document.querySelector('.text__hashtags');
  window.hashtagsElement = hashtagsElement;

  var getHashtagsArray = function () {
    var hashtagsString = hashtagsElement.value;
    hashtagsString = hashtagsString.trim();
    var hashtagsArray = hashtagsString.split(' ');
    return hashtagsArray;
  };

  var checkIfTooMuchHashtags = function (hashtagsArray) {
    if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      hashtagsElement.setCustomValidity('Нельзя указывать более пяти хэш-тегов');
    }
  };

  var checkDoubleOccurrence = function (hashtagsArray) {
    var tempStorage = [];
    hashtagsArray.forEach(function (hashtag) {
      hashtag = hashtag.toLowerCase();
      if (tempStorage.indexOf(hashtag) === -1) {
        tempStorage.push(hashtag);
      } else {
        hashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. #ХэшТег и #хэштег считаются одним и тем же тегом');
      }
    });
  };

  var checkIfStartsWithHashSymbol = function (hashtag) {
    if (hashtag.match(/(^#)/) === null) {
      hashtagsElement.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
    }
  };

  var checkIfContainsOtherSymbols = function (hashtag) {
    if (hashtag === '#') {
      hashtagsElement.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    }
  };

  var checkIfContainsAnotherHashSymbol = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.indexOf('#', 1) > 0) {
      hashtagsElement.setCustomValidity('Хэш-теги должны разделяться пробелами');
    }
  };

  var checkIfTooLong = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.length > MAX_HASHTAG_LENGTH) {
      hashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега должна быть 20 символов, включая решётку');
    }
  };

  var hashtagsValidation = function () {
    var hashtags = getHashtagsArray();

    checkIfTooMuchHashtags(hashtags);
    checkDoubleOccurrence(hashtags);

    hashtags.forEach(function (hashtag) {
      checkIfStartsWithHashSymbol(hashtag);
      checkIfContainsOtherSymbols(hashtag);
      checkIfContainsAnotherHashSymbol(hashtag);
      checkIfTooLong(hashtag);
    });
  };

  var hastagsElementKeypressHandler = function () {
    hashtagsElement.setCustomValidity('');
  };

  var hastagsElementBlurHandler = function () {
    hashtagsElement.setCustomValidity('');
    hashtagsValidation();
  };

  hashtagsElement.addEventListener('keypress', hastagsElementKeypressHandler);
  hashtagsElement.addEventListener('blur', hastagsElementBlurHandler);
})();
