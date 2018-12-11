'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;

  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview');
  var imgPreviewElement = uploadPreviewElement.querySelector('img');
  var sliderPinElement = pictureEditingElement.querySelector('.effect-level__pin');
  var sliderLineElement = pictureEditingElement.querySelector('.effect-level__depth');
  var sliderEffectLevelValueElement = pictureEditingElement.querySelector('.effect-level__value');

  var changeEffectLevel = function (type, level, unit) {
    imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(sliderPinElement.style.left, 10);
    var effectLevel = ((window.imageEffects.currentEffect.max - window.imageEffects.currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + window.imageEffects.currentEffect.min;
    return effectLevel;
  };

  var sliderPinElementMouseDownHandler = function (evtMouseDown) {
    evtMouseDown.preventDefault();
    var sliderLineWidth = sliderLineElement.offsetWidth;
    var initialPinPosition = sliderPinElement.offsetLeft - SLIDER_PIN_WIDTH / 2;
    var startMouseX = evtMouseDown.clientX;

    var documentMouseMoveHandler = function (evtMouseMove) {
      evtMouseMove.preventDefault();
      var shift = startMouseX - evtMouseMove.clientX;
      startMouseX = evtMouseMove.clientX;
      var newPinPosition = initialPinPosition - shift;
      initialPinPosition = newPinPosition;
      var newPinPositionInPercent = Math.round(newPinPosition * window.utilities.MULTIPLICAND / sliderLineWidth);

      if (newPinPositionInPercent <= window.utilities.MULTIPLICAND && newPinPositionInPercent >= 0) {
        sliderPinElement.style.left = newPinPositionInPercent + '%';
        changeEffectLevel(window.imageEffects.currentEffect.filterType, convertPinPositionToEffectLevel(), window.imageEffects.currentEffect.unit);
      }
    };

    var documentMouseUpHandler = function (evtMouseUp) {
      evtMouseUp.preventDefault();
      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  };

  sliderPinElement.addEventListener('mousedown', sliderPinElementMouseDownHandler);
})();
