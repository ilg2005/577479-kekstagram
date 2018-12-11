'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';

  window.imageEffects = {
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
    }
  };


  var pictureEditingElement = document.querySelector('.img-upload__overlay');
  var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview');
  var sliderPinElement = pictureEditingElement.querySelector('.effect-level__pin');
  var sliderLineElement = pictureEditingElement.querySelector('.effect-level__depth');
  var imgPreviewElement = uploadPreviewElement.querySelector('img');


  var effectsListElement = pictureEditingElement.querySelector('.effects__list');
  var effectLevelElement = pictureEditingElement.querySelector('.effect-level');

  var changeEffectLevel = function (type, level, unit) {
    imgPreviewElement.style.filter = type + '(' + level + unit + ')';
  };

  var convertPinPositionToEffectLevel = function () {
    sliderEffectLevelValueElement.value = parseInt(sliderPinElement.style.left, 10);
    var effectLevel = ((currentEffect.max - currentEffect.min) * sliderEffectLevelValueElement.value / window.utilities.MULTIPLICAND) + currentEffect.min;
    return effectLevel;
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

  effectsListElement.addEventListener('click', effectsListElementClickHandler);
})();
