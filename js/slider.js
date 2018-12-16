'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;

  var sliderElement = document.querySelector('.img-upload__effect-level');
  var sliderPinElement = sliderElement.querySelector('.effect-level__pin');
  var sliderLineElement = sliderElement.querySelector('.effect-level__depth');
  var sliderEffectLevelValueElement = sliderElement.querySelector('.effect-level__value');


  window.slider = {
    PinElement: sliderPinElement,
    LineElement: sliderLineElement,
    currentPinPositionInPercent: sliderPinElement.style.left
  };

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(window.slider.currentPinPositionInPercent, 10);
    var effectLevel = ((window.imageEffects.currentEffect.max - window.imageEffects.currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + window.imageEffects.currentEffect.min;
    return effectLevel;
  };

  var changeEffectLevel = function (type, level, unit) {
    window.imageEffects.imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  var sliderPinElementMouseDownHandler = function (evtMouseDown) {
    evtMouseDown.preventDefault();
    var sliderLineWidthInPx = sliderLineElement.offsetWidth;
    var initialPinPositionInPx = sliderPinElement.offsetLeft - SLIDER_PIN_WIDTH / 2;
    var startMouseX = evtMouseDown.clientX;

    var documentMouseMoveHandler = function (evtMouseMove) {
      evtMouseMove.preventDefault();
      var shift = startMouseX - evtMouseMove.clientX;
      startMouseX = evtMouseMove.clientX;
      var newPinPositionInPx = initialPinPositionInPx - shift;
      initialPinPositionInPx = newPinPositionInPx;
      var newPinPositionInPercent = Math.round(newPinPositionInPx * window.utilities.MULTIPLICAND / sliderLineWidthInPx);

      if (newPinPositionInPercent <= window.utilities.MULTIPLICAND && newPinPositionInPercent >= 0) {
        sliderPinElement.style.left = newPinPositionInPercent + '%';
        window.slider.currentPinPositionInPercent = newPinPositionInPercent + '%';
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
