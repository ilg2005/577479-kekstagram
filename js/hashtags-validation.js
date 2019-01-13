'use strict';

(function () {
  var MAX_HASHTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagsElement = document.querySelector('.text__hashtags');
  window.hashtagsElement = hashtagsElement;

  var getHashtagsArray = function () {
    var hashtagsString = hashtagsElement.value;
    hashtagsString = hashtagsString.trim();
    hashtagsString = hashtagsString.replace(/\s\s+/, ' ');
    var hashtagsArray = hashtagsString.split(' ');
    return hashtagsArray;
  };

  var checkStartsWithHashSymbol = function (hashtag) {
    if ((hashtag.match(/(^#.+)|(^$)/) === null) || (hashtagsElement.value.charAt(0) === ' ')) {
      hashtagsElement.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
    }
  };

  var checkTooMuchHashtags = function (hashtagsArray) {
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

  var checkOtherSymbolsPresence = function (hashtag) {
    if (hashtag === '#') {
      hashtagsElement.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    }
  };

  var checkAnotherHashSymbolPresence = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.indexOf('#', 1) > 0) {
      hashtagsElement.setCustomValidity('Хэш-теги должны разделяться пробелами');
    }
  };

  var checkTooLong = function (hashtag) {
    var hashtagChars = hashtag.split('');
    if (hashtagChars.length > MAX_HASHTAG_LENGTH) {
      hashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега должна быть 20 символов, включая решётку');
    }
  };

  var hashtagsValidation = function () {
    var hashtags = getHashtagsArray();

    checkTooMuchHashtags(hashtags);
    checkDoubleOccurrence(hashtags);

    hashtags.forEach(function (hashtag) {
      checkStartsWithHashSymbol(hashtag);
      checkOtherSymbolsPresence(hashtag);
      checkAnotherHashSymbolPresence(hashtag);
      checkTooLong(hashtag);
    });
  };

  var addRedBorderToInvalid = function () {
    if (!hashtagsElement.validity.valid) {
      hashtagsElement.classList.add('text__invalid');
    }
  };

  var hastagsElementKeydownHandler = function () {
    hashtagsElement.setCustomValidity('');
    hashtagsElement.classList.remove('text__invalid');
  };

  var hastagsElementBlurHandler = function () {
    hashtagsValidation();
    addRedBorderToInvalid();
  };

  hashtagsElement.addEventListener('keydown', hastagsElementKeydownHandler);
  hashtagsElement.addEventListener('blur', hastagsElementBlurHandler);
})();
