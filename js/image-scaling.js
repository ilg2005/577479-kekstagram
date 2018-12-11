'use strict';

(function () {
  var MIN_SCALE_VALUE = '25%';
  var MAX_SCALE_VALUE = '100%';
  var SCALE_STEP = '25%';

  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview');
  var scaleSmallerElement = pictureEditingElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = pictureEditingElement.querySelector('.scale__control--bigger');
  var scaleValueElement = pictureEditingElement.querySelector('.scale__control--value');

  var increaseScaleValue = function () {
    var currentScaleValue = scaleValueElement.value;
    if (currentScaleValue !== MAX_SCALE_VALUE) {
      var newScaleValue = parseInt(currentScaleValue, 10) + parseInt(SCALE_STEP, 10);
      scaleValueElement.value = newScaleValue + '%';
    }
    return newScaleValue / window.utilities.MULTIPLICAND;
  };

  var decreaseScaleValue = function () {
    var currentScaleValue = scaleValueElement.value;
    if (currentScaleValue !== MIN_SCALE_VALUE) {
      var newScaleValue = parseInt(currentScaleValue, 10) - parseInt(SCALE_STEP, 10);
      scaleValueElement.value = newScaleValue + '%';
    }
    return newScaleValue / window.utilities.MULTIPLICAND;
  };

  var scaleSmallerElementClickHandler = function () {
    var decimalValueOfPercent = decreaseScaleValue();
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  var scaleBiggerElementClickHandler = function () {
    var decimalValueOfPercent = increaseScaleValue();
    uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  scaleSmallerElement.addEventListener('click', scaleSmallerElementClickHandler);
  scaleBiggerElement.addEventListener('click', scaleBiggerElementClickHandler);
})();
