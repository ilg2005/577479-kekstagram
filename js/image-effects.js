'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';
  var SLIDER_PIN_WIDTH = 18;

  var currentEffect;

  var EFFECT_CHROME = {
    filterType: 'grayscale',
    min: 0,
    max: 1,
    unit: ''
  };
  var EFFECT_SEPIA = {
    filterType: 'sepia',
    min: 0,
    max: 1,
    unit: ''
  };
  var EFFECT_MARVIN = {
    filterType: 'invert',
    min: 0,
    max: 100,
    unit: '%'
  };
  var EFFECT_PHOBOS = {
    filterType: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  };
  var EFFECT_HEAT = {
    filterType: 'brightness',
    min: 1,
    max: 3,
    unit: ''
  };


  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview');
  var imgPreviewElement = uploadPreviewElement.querySelector('img');


  var effectsListElement = pictureEditingElement.querySelector('.effects__list');
  var effectLevelElement = pictureEditingElement.querySelector('.effect-level');
  var sliderPinElement = pictureEditingElement.querySelector('.effect-level__pin');
  var sliderLineElement = pictureEditingElement.querySelector('.effect-level__depth');
  var sliderEffectLevelValueElement = pictureEditingElement.querySelector('.effect-level__value');

  var changeEffectLevel = function (type, level, unit) {
    imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(sliderPinElement.style.left, 10);
    var effectLevel = ((currentEffect.max - currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + currentEffect.min;
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
        changeEffectLevel(currentEffect.filterType, convertPinPositionToEffectLevel(), currentEffect.unit);
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

  var resetSliderSettingsToDefault = function () {
    imgPreviewElement.className = '';
    sliderPinElement.style.left = DEFAULT_EFFECT_LEVEL;
    sliderLineElement.style.width = DEFAULT_EFFECT_LEVEL;
    imgPreviewElement.style.filter = '';
  };

  var changeEffectType = function (effect) {
    resetSliderSettingsToDefault();
    if (effect !== 'none') {
      window.utilities.showElement(effectLevelElement);
    }
    var effectClass = 'effects__preview--' + effect;
    imgPreviewElement.classList.add(effectClass);
  };

  var effectsListElementClickHandler = function (evt) {
    var effectTypeName = evt.target.value;
    switch (effectTypeName) {
      case 'chrome':
        currentEffect = EFFECT_CHROME;
        break;
      case 'sepia':
        currentEffect = EFFECT_SEPIA;
        break;
      case 'marvin':
        currentEffect = EFFECT_MARVIN;
        break;
      case 'phobos':
        currentEffect = EFFECT_PHOBOS;
        break;
      case 'heat':
        currentEffect = EFFECT_HEAT;
        break;
      case 'none':
        window.utilities.hideElement(effectLevelElement);
        break;
    }
    changeEffectType(effectTypeName);
  };

  effectsListElement.addEventListener('click', effectsListElementClickHandler);
  sliderPinElement.addEventListener('mousedown', sliderPinElementMouseDownHandler);
})();
