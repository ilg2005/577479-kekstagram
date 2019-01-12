'use strict';

(function () {
  var SLIDER_PIN_WIDTH = 18;
  var PIN_POSITION_CHANGE_STEP = 1;

  var sliderElement = document.querySelector('.img-upload__effect-level');
  var pinElement = sliderElement.querySelector('.effect-level__pin');
  var lineElement = sliderElement.querySelector('.effect-level__depth');

  var movePinToNewPosition = function (newPosition) {
    pinElement.style.left = newPosition + '%';
    window.slider.currentPinPositionInPercent = pinElement.style.left;
  };

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
        movePinToNewPosition(newPinPositionInPercent);
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
    if (window.utilities.isArrowLeftEvent(evt) && parseInt(pinElement.style.left, 10) > 0) {
      var newPinPositionInPercent = parseInt(pinElement.style.left, 10) - PIN_POSITION_CHANGE_STEP;
      movePinToNewPosition(newPinPositionInPercent);
      window.imageEffects.changeEffectLevel();
    } else if (window.utilities.isArrowRightEvent(evt) && parseInt(pinElement.style.left, 10) < window.utilities.MULTIPLICAND) {
      newPinPositionInPercent = parseInt(pinElement.style.left, 10) + PIN_POSITION_CHANGE_STEP;
      movePinToNewPosition(newPinPositionInPercent);
      window.imageEffects.changeEffectLevel();
    }
  };

  var pinElementKeydownTabHandler = function (evt) {
    if (window.utilities.isTabEvent(evt)) {
      evt.preventDefault();
      window.hashtagsElement.focus();
    }
  };

  var pinElementFocusHandler = function () {
    pinElement.addEventListener('keydown', pinElementKeydownArrowHandler);
    pinElement.addEventListener('keydown', pinElementKeydownTabHandler);
  };

  var pinElementBlurHandler = function () {
    pinElement.removeEventListener('focus', pinElementFocusHandler);
  };

  pinElement.addEventListener('mousedown', pinElementMouseDownHandler);
  pinElement.addEventListener('focus', pinElementFocusHandler);
  pinElement.addEventListener('blur', pinElementBlurHandler);

  window.slider = {
    pinElement: pinElement,
    lineElement: lineElement,
    currentPinPositionInPercent: pinElement.style.left
  };
})();
