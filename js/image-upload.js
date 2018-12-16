'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEFAULT_SCALE_VALUE = '100%';

  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');

  window.imageUpload = {
    pictureEditingElement: pictureEditingElement,
    uploadPreviewElement: uploadPreviewElement
  };

  var uploadFileElement = document.querySelector('#upload-file');
  var cancelEditingElement = document.querySelector('#upload-cancel');
  var hashtagsElement = document.querySelector('.text__hashtags');
  var commentsElement = document.querySelector('.text__description');

  var restoreDefault = function () {
    window.imageScaling.scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(DEFAULT_SCALE_VALUE, 10) / window.utilities.MULTIPLICAND;
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
    window.imageEffects.imgPreviewElement.className = '';
    window.imageEffects.imgPreviewElement.style.filter = '';
  };

  var cancelImageEditing = function () {
    window.utilities.hideElement(pictureEditingElement);
    document.removeEventListener('keydown', documentKeydownEscHandler);
    uploadFileElement.value = '';
    restoreDefault();
  };

  var documentKeydownEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsElement && evt.target !== commentsElement) {
      cancelImageEditing();
      restoreDefault();
    }
  };

  var cancelEditingElementClickHandler = function () {
    cancelImageEditing();
  };

  var uploadFileElementChangeHandler = function () {
    window.utilities.showElement(pictureEditingElement);
    window.utilities.hideElement(window.imageEffects.effectLevelElement);
    cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
  };

  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);
})();
