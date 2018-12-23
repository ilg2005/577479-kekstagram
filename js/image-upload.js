'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = '100%';

  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');

  var uploadFileElement = document.querySelector('#upload-file');
  var cancelEditingElement = document.querySelector('#upload-cancel');
  var commentsElement = document.querySelector('.text__description');

  var restoreDefault = function () {
    window.scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(DEFAULT_SCALE_VALUE, 10) / window.utilities.MULTIPLICAND;
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
    window.imageEffects.imgPreviewElement.className = '';
    window.imageEffects.imgPreviewElement.style.filter = '';
  };

  var documentKeydownEscHandler = function (evt) {
    if (window.utilities.isEscEvent(evt) && evt.target !== window.hashtagsElement && evt.target !== commentsElement) {
      window.imageUpload.cancelImageEditing();
      restoreDefault();
    }
  };

  var cancelEditingElementClickHandler = function () {
    window.imageUpload.cancelImageEditing();
  };

  var uploadFileElementChangeHandler = function () {
    window.utilities.showElement(pictureEditingElement);
    window.utilities.hideElement(window.imageEffects.effectLevelElement);
    cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
    document.addEventListener('keydown', documentKeydownEscHandler);
    window.formSubmit.formElement.addEventListener('submit', window.formSubmit.formSubmitHandler);
  };

  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);

  window.imageUpload = {
    pictureEditingElement: pictureEditingElement,
    uploadPreviewElement: uploadPreviewElement,
    cancelImageEditing: function () {
      window.utilities.hideElement(pictureEditingElement);
      document.removeEventListener('keydown', documentKeydownEscHandler);
      uploadFileElement.value = '';
      restoreDefault();
    }
  };
})();
