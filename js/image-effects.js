'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';
  var effectsListElement = window.imageUpload.pictureEditingElement.querySelector('.effects__list');
  var sliderEffectLevelValueElement = window.imageUpload.pictureEditingElement.querySelector('.effect-level__value');
  var imgPreviewElement = window.imageUpload.uploadPreviewElement.querySelector('img');
  var effectLevelElement = window.imageUpload.pictureEditingElement.querySelector('.effect-level');

  window.imageEffects = {
    imgPreviewElement: imgPreviewElement,
    effectLevelElement: effectLevelElement,
    currentEffect: {},
    EFFECT_CHROME: {
      filterType: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    EFFECT_SEPIA: {
      filterType: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    EFFECT_MARVIN: {
      filterType: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    EFFECT_PHOBOS: {
      filterType: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    EFFECT_HEAT: {
      filterType: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    },
    changeEffectLevel: function () {
      applyEffectLevel(window.imageEffects.currentEffect.filterType, convertPinPositionToEffectLevel(), window.imageEffects.currentEffect.unit);
    }
  };

  var resetSliderSettingsToDefault = function () {
    imgPreviewElement.className = '';
    window.slider.PinElement.style.left = DEFAULT_EFFECT_LEVEL;
    window.slider.LineElement.style.width = DEFAULT_EFFECT_LEVEL;
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
        window.imageEffects.currentEffect = window.imageEffects.EFFECT_CHROME;
        break;
      case 'sepia':
        window.imageEffects.currentEffect = window.imageEffects.EFFECT_SEPIA;
        break;
      case 'marvin':
        window.imageEffects.currentEffect = window.imageEffects.EFFECT_MARVIN;
        break;
      case 'phobos':
        window.imageEffects.currentEffect = window.imageEffects.EFFECT_PHOBOS;
        break;
      case 'heat':
        window.imageEffects.currentEffect = window.imageEffects.EFFECT_HEAT;
        break;
      case 'none':
        window.utilities.hideElement(effectLevelElement);
        break;
    }
    changeEffectType(effectTypeName);
  };

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(window.slider.currentPinPositionInPercent, 10);
    var effectLevel = ((window.imageEffects.currentEffect.max - window.imageEffects.currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + window.imageEffects.currentEffect.min;
    return effectLevel;
  };

  var applyEffectLevel = function (type, level, unit) {
    imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  effectsListElement.addEventListener('click', effectsListElementClickHandler);
})();
