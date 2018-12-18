'us strict';

(function () {
  var SPACE_KEYCODE = 32;
  var MAX_HASHTAGS_NUMBER = 5;
  var hashtagsElement = document.querySelector('.text__hashtags');
  var errorMessage;
  var checkHashtagValidity = function () {
    var hashtagsString = hashtagsElement.value;
    var hashtags = hashtagsString.split(' ');
    var hashtagsNumber = hashtags.length;
    console.log(hashtagsNumber);
    hashtagsElement.setAttribute('pattern', '#');
    if (hashtagsElement.validity.patternMismatch) {
      hashtagsElement.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
    }
  };

  var hastagsElementKeypressSpaceHandler = function (evt) {
    if (evt.keyCode === SPACE_KEYCODE) {
      checkHashtagValidity();
    }
  };

  hashtagsElement.addEventListener('keypress', hastagsElementKeypressSpaceHandler);
})();
