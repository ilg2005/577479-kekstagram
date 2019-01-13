'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_SCALE_VALUE = '100%';

  var uploadFileElement = document.querySelector('#upload-file');
  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = document.querySelector('.img-upload__preview');
  var effectsPreviewElements = document.querySelectorAll('.effects__preview');
  var imagePreviewElement = uploadPreviewElement.firstElementChild;
  var cancelEditingElement = document.querySelector('#upload-cancel');
  var commentsElement = document.querySelector('.text__description');

  var readFile = function (fileToRead) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      imagePreviewElement.src = reader.result;
      effectsPreviewElements.forEach(function (element) {
        element.style.backgroundImage = 'url(' + reader.result + ')';
      });
    });
    reader.readAsDataURL(fileToRead);
  };

  var restoreDefault = function () {
    window.scaleValueElement.value = DEFAULT_SCALE_VALUE;
    var decimalValueOfPercent = parseInt(DEFAULT_SCALE_VALUE, 10) / window.utilities.MULTIPLICAND;
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
    imagePreviewElement.className = '';
    imagePreviewElement.style.filter = '';
    window.hashtagsElement.setCustomValidity('');
    window.hashtagsElement.classList.remove('text__invalid');
  };

  var documentKeydownEscHandler = function (evt) {
    if (window.utilities.isEscEvent(evt) && evt.target !== window.hashtagsElement && evt.target !== commentsElement) {
      window.imageUpload.cancelImageEditing();
    }
  };

  var cancelEditingElementClickHandler = function () {
    window.imageUpload.cancelImageEditing();
  };

  var cancelEditingElementBlurHandler = function () {
    if (window.utilities.isTabEvent) {
      pictureEditingElement.querySelector('[tabindex="1"]').focus();
    }
  };

  var uploadFileElementChangeHandler = function (evt) {
    var selectedFile = uploadFileElement.files[0];

    var fileName = selectedFile.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (!matches) {
      evt.preventDefault();
      var errorFileMessage = 'Разрешается загружать изображения с расширениями ' + FILE_TYPES.join(', ');
      window.utilities.renderErrorMessage(errorFileMessage);
    } else {
      readFile(selectedFile);
      window.utilities.showElement(pictureEditingElement);
      window.utilities.hideElement(window.imageEffects.effectLevelElement);
      cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
      document.addEventListener('keydown', documentKeydownEscHandler);
      window.formSubmit.formElement.addEventListener('submit', window.formSubmit.formSubmitHandler);
    }
  };

  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);
  cancelEditingElement.addEventListener('blur', cancelEditingElementBlurHandler);

  window.imageUpload = {
    pictureEditingElement: pictureEditingElement,
    uploadFileElement: uploadFileElement,
    uploadPreviewElement: uploadPreviewElement,
    imagePreviewElement: imagePreviewElement,
    cancelImageEditing: function () {
      window.utilities.hideElement(pictureEditingElement);
      document.removeEventListener('keydown', documentKeydownEscHandler);
      window.formSubmit.formElement.reset();
      restoreDefault();
    }
  };
})();
