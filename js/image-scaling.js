'use strict';

(function () {
  var MIN_SCALE_VALUE = '25%';
  var MAX_SCALE_VALUE = '100%';
  var SCALE_STEP = '25%';

  window.imageScaling = {
    scaleValueElement: window.uploadImage.pictureEditingElement.querySelector('.scale__control--value')
  };

  var scaleSmallerElement = window.uploadImage.pictureEditingElement.querySelector('.scale__control--smaller');
  var scaleBiggerElement = window.uploadImage.pictureEditingElement.querySelector('.scale__control--bigger');

  var increaseScaleValue = function () {
    var currentScaleValue = window.imageScaling.scaleValueElement.value;
    if (currentScaleValue !== MAX_SCALE_VALUE) {
      var newScaleValue = parseInt(currentScaleValue, 10) + parseInt(SCALE_STEP, 10);
      window.imageScaling.scaleValueElement.value = newScaleValue + '%';
    }
    return newScaleValue / window.utilities.MULTIPLICAND;
  };

  var decreaseScaleValue = function () {
    var currentScaleValue = window.imageScaling.scaleValueElement.value;
    if (currentScaleValue !== MIN_SCALE_VALUE) {
      var newScaleValue = parseInt(currentScaleValue, 10) - parseInt(SCALE_STEP, 10);
      window.imageScaling.scaleValueElement.value = newScaleValue + '%';
    }
    return newScaleValue / window.utilities.MULTIPLICAND;
  };

  var scaleSmallerElementClickHandler = function () {
    var decimalValueOfPercent = decreaseScaleValue();
    window.uploadImage.uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  var scaleBiggerElementClickHandler = function () {
    var decimalValueOfPercent = increaseScaleValue();
    window.uploadImage.uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
  };

  scaleSmallerElement.addEventListener('click', scaleSmallerElementClickHandler);
  scaleBiggerElement.addEventListener('click', scaleBiggerElementClickHandler);
})();
