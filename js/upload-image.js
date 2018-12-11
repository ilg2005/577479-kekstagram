'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE_VALUE = '100%';

  window.uploadImage = {
    pictureEditingElement: document.querySelector('.img-upload__overlay'),
    uploadPreviewElement: document.querySelector('.img-upload__preview')
  };

  var uploadFileElement = document.querySelector('#upload-file');
  var cancelEditingElement = document.querySelector('#upload-cancel');
  var hashtagsElement = document.querySelector('.text__hashtags');
  var commentsElement = document.querySelector('.text__description');

  var restoreDefaultScale = function (defaultValue) {
    window.imageScaling.scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(defaultValue, 10) / window.utilities.MULTIPLICAND;
    window.uploadImage.uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsElement && evt.target !== commentsElement) {
      cancelImageEditing();
      restoreDefaultScale(DEFAULT_SCALE_VALUE);
    }
  };

  var cancelImageEditing = function () {
    window.utilities.hideElement(window.uploadImage.pictureEditingElement);
    document.removeEventListener('keydown', documentKeydownEscHandler);
    uploadFileElement.value = '';
    restoreDefaultScale(DEFAULT_SCALE_VALUE);
  };

  var cancelEditingElementClickHandler = function () {
    cancelImageEditing();
  };

  var uploadFileElementChangeHandler = function () {
    window.utilities.showElement(window.uploadImage.pictureEditingElement);
    window.utilities.hideElement(window.imageEffects.effectLevelElement);
    cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
  };

  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);
})();
