'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;

  window.slider = {
    sliderPinElement: window.uploadImage.pictureEditingElement.querySelector('.effect-level__pin'),
    sliderLineElement: window.uploadImage.pictureEditingElement.querySelector('.effect-level__depth'),
    sliderEffectLevelValueElement: window.uploadImage.pictureEditingElement.querySelector('.effect-level__value')
  };

  var convertPinPositionToEffectLevel = function () {
    window.slider.sliderEffectLevelValueElement.value = parseInt(window.slider.sliderPinElement.style.left, 10);
    var effectLevel = ((window.imageEffects.currentEffect.max - window.imageEffects.currentEffect.min) * window.slider.sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + window.imageEffects.currentEffect.min;
    return effectLevel;
  };

  var changeEffectLevel = function (type, level, unit) {
    window.imageEffects.imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  var sliderPinElementMouseDownHandler = function (evtMouseDown) {
    evtMouseDown.preventDefault();
    var sliderLineWidth = window.slider.sliderLineElement.offsetWidth;
    var initialPinPosition = window.slider.sliderPinElement.offsetLeft - SLIDER_PIN_WIDTH / 2;
    var startMouseX = evtMouseDown.clientX;

    var documentMouseMoveHandler = function (evtMouseMove) {
      evtMouseMove.preventDefault();
      var shift = startMouseX - evtMouseMove.clientX;
      startMouseX = evtMouseMove.clientX;
      var newPinPosition = initialPinPosition - shift;
      initialPinPosition = newPinPosition;
      var newPinPositionInPercent = Math.round(newPinPosition * window.utilities.MULTIPLICAND / sliderLineWidth);

      if (newPinPositionInPercent <= window.utilities.MULTIPLICAND && newPinPositionInPercent >= 0) {
        window.slider.sliderPinElement.style.left = newPinPositionInPercent + '%';
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

  window.slider.sliderPinElement.addEventListener('mousedown', sliderPinElementMouseDownHandler);
})();
