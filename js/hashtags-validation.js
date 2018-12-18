'us strict';

(function () {
  var SPACE_KEYCODE = 32;
  var hashtagsElement = document.querySelector('.text__hashtags');

  var hastagsElementKeypressSpaceHandler = function (evt) {
    if (evt.keyCode === SPACE_KEYCODE) {
      console.log('space');
    }
  };

  hashtagsElement.addEventListener('keypress', hastagsElementKeypressSpaceHandler);
})();
