'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;
  var PIN_POSITION_CHANGE_STEP = 1;

  var sliderElement = document.querySelector('.img-upload__effect-level');
  var pinElement = sliderElement.querySelector('.effect-level__pin');
  var lineElement = sliderElement.querySelector('.effect-level__depth');

  var pinElementMouseDownHandler = function (evtMouseDown) {
    evtMouseDown.preventDefault();
    var sliderLineWidthInPx = lineElement.offsetWidth;
    var initialPinPositionInPx = pinElement.offsetLeft - SLIDER_PIN_WIDTH / 2;
    var startMouseX = evtMouseDown.clientX;

    var documentMouseMoveHandler = function (evtMouseMove) {
      evtMouseMove.preventDefault();
      var shift = startMouseX - evtMouseMove.clientX;
      startMouseX = evtMouseMove.clientX;
      var newPinPositionInPx = initialPinPositionInPx - shift;
      initialPinPositionInPx = newPinPositionInPx;
      var newPinPositionInPercent = Math.round(newPinPositionInPx * window.utilities.MULTIPLICAND / sliderLineWidthInPx);

      if (newPinPositionInPercent <= window.utilities.MULTIPLICAND && newPinPositionInPercent >= 0) {
        pinElement.style.left = newPinPositionInPercent + '%';
        window.slider.currentPinPositionInPercent = newPinPositionInPercent + '%';
        window.imageEffects.changeEffectLevel();
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

  var pinElementKeydownArrowHandler = function (evt) {
    if (window.utilities.isArrowLeftEvent(evt) && parseInt(pinElement.style.left) > 0) {
      console.log(pinElement.style.left);
      console.log(parseInt(pinElement.style.left) - PIN_POSITION_CHANGE_STEP + '%');
      window.slider.currentPinPositionInPercent = parseInt(pinElement.style.left) - PIN_POSITION_CHANGE_STEP + '%';
      window.imageEffects.changeEffectLevel();
      pinElement.style.left = window.slider.currentPinPositionInPercent;
      console.log(pinElement.style.left);
    } else if (window.utilities.isArrowRightEvent(evt) && parseInt(pinElement.style.left) < window.utilities.MULTIPLICAND) {
      console.log(pinElement.style.left);
      console.log(parseInt(pinElement.style.left) + PIN_POSITION_CHANGE_STEP + '%');
      window.slider.currentPinPositionInPercent = parseInt(pinElement.style.left) + PIN_POSITION_CHANGE_STEP + '%';
      window.imageEffects.changeEffectLevel();
      pinElement.style.left = window.slider.currentPinPositionInPercent;
      console.log(pinElement.style.left);
    }
  };

  var pinElementFocusHandler = function () {
    pinElement.addEventListener('keydown', pinElementKeydownArrowHandler);
  };

  pinElement.addEventListener('mousedown', pinElementMouseDownHandler);
  pinElement.addEventListener('focus', pinElementFocusHandler);

  window.slider = {
    pinElement: pinElement,
    lineElement: lineElement,
    currentPinPositionInPercent: pinElement.style.left
  };
})();
