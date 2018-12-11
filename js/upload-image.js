'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE_VALUE = '100%';

  window.uploadImage = {

  };

  var uploadFileElement = document.querySelector('#upload-file');
  var pictureEditingElement = document.querySelector('.img-upload__overlay'); // общие переменные
  var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview'); // общие переменные
  var cancelEditingElement = pictureEditingElement.querySelector('#upload-cancel');
  var scaleValueElement = pictureEditingElement.querySelector('.scale__control--value');
  var effectLevelElement = pictureEditingElement.querySelector('.effect-level');
  var hashtagsElement = pictureEditingElement.querySelector('.text__hashtags');
  var commentsElement = pictureEditingElement.querySelector('.text__description');

  var restoreDefaultScale = function (defaultValue) {
    scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(defaultValue, 10) / window.utilities.MULTIPLICAND;
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsElement && evt.target !== commentsElement) {
      cancelImageEditing();
      restoreDefaultScale(DEFAULT_SCALE_VALUE);
    }
  };

  var cancelImageEditing = function () {
    window.utilities.hideElement(pictureEditingElement);
    document.removeEventListener('keydown', documentKeydownEscHandler);
    uploadFileElement.value = '';
    restoreDefaultScale(DEFAULT_SCALE_VALUE);
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
