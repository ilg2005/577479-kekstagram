'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var uploadFileElement = document.querySelector('#upload-file');
  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var cancelEditingElement = pictureEditingElement.querySelector('#upload-cancel');
  var effectLevelElement = pictureEditingElement.querySelector('.effect-level');
  var hashtagsElement = pictureEditingElement.querySelector('.text__hashtags');
  var commentsElement = pictureEditingElement.querySelector('.text__description');

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsElement && evt.target !== commentsElement) {
      cancelImageEditing();
    }
  };

  var cancelImageEditing = function () {
    window.utilities.hideElement(pictureEditingElement);
    document.removeEventListener('keydown', documentKeydownEscHandler);
    uploadFileElement.value = '';
  };

  var cancelEditingElementClickHandler = function () {
    cancelImageEditing();
  };

  var uploadFileElementChangeHandler = function () {
    window.utilities.showElement(pictureEditingElement);
    window.utilities.hideElement(effectLevelElement);
    cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
  };

  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);
})();
