'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';

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

  var currentEffect = {};

  var effectsListElement = window.imageUpload.pictureEditingElement.querySelector('.effects__list');
  var sliderEffectLevelValueElement = window.imageUpload.pictureEditingElement.querySelector('.effect-level__value');
  var effectLevelElement = window.imageUpload.pictureEditingElement.querySelector('.effect-level');

  var resetSliderSettingsToDefault = function () {
    window.imageUpload.imgPreviewElement.className = '';
    window.slider.pinElement.style.left = DEFAULT_EFFECT_LEVEL;
    window.slider.lineElement.style.width = DEFAULT_EFFECT_LEVEL;
    window.imageUpload.imgPreviewElement.style.filter = '';
  };

  var changeEffectType = function (effect) {
    resetSliderSettingsToDefault();
    if (effect !== 'none') {
      window.utilities.showElement(effectLevelElement);
    }
    var effectClass = 'effects__preview--' + effect;
    window.imageUpload.imgPreviewElement.classList.add(effectClass);
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

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(window.slider.currentPinPositionInPercent, 10);
    var effectLevel = ((currentEffect.max - currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + currentEffect.min;
    return effectLevel;
  };

  var applyEffectLevel = function (type, level, unit) {
    window.imageUpload.imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  effectsListElement.addEventListener('click', effectsListElementClickHandler);

  window.imageEffects = {
    effectLevelElement: effectLevelElement,
    changeEffectLevel: function () {
      applyEffectLevel(currentEffect.filterType, convertPinPositionToEffectLevel(), currentEffect.unit);
    }
  };
})();
