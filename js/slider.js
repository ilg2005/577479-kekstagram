'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;

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
    if (parseInt(pinElement.style.left) <= window.utilities.MULTIPLICAND && parseInt(pinElement.style.left) >= 0) {
      if (window.utilities.isArrowLeftEvent(evt)) {
        console.log(pinElement.style.left);
        console.log(parseInt(pinElement.style.left) - 1 + '%');
        window.slider.currentPinPositionInPercent = parseInt(pinElement.style.left) - 1 + '%';
        window.imageEffects.changeEffectLevel();
        pinElement.style.left = window.slider.currentPinPositionInPercent;
        console.log(pinElement.style.left);
      } else if (window.utilities.isArrowRightEvent(evt)) {
        console.log(pinElement.style.left);
        console.log(parseInt(pinElement.style.left) + 1 + '%');
        window.slider.currentPinPositionInPercent = parseInt(pinElement.style.left) + 1 + '%';
        window.imageEffects.changeEffectLevel();
        pinElement.style.left = window.slider.currentPinPositionInPercent;
        console.log(pinElement.style.left);
      }
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
