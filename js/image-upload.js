'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_SCALE_VALUE = '100%';

  var uploadFileElement = document.querySelector('#upload-file');
  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');
  var imgPreviewElement = uploadPreviewElement.firstElementChild;
  var cancelEditingElement = document.querySelector('#upload-cancel');
  var commentsElement = document.querySelector('.text__description');

  var readFile = function (fileToRead) {
    var fileName = fileToRead.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreviewElement.src = reader.result;
      });

      reader.readAsDataURL(fileToRead);
    }
  };

  var restoreDefault = function () {
    window.scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(DEFAULT_SCALE_VALUE, 10) / window.utilities.MULTIPLICAND;
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
    imgPreviewElement.className = '';
    imgPreviewElement.style.filter = '';
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
    var selectedFile = uploadFileElement.files[0];
    readFile(selectedFile);
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
    imgPreviewElement: imgPreviewElement,
    cancelImageEditing: function () {
      window.utilities.hideElement(pictureEditingElement);
      document.removeEventListener('keydown', documentKeydownEscHandler);
      uploadFileElement.value = '';
      restoreDefault();
    }
  };
})();
