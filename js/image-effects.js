'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';

  var effectTypeMap = {
    'chrome': {
      filterType: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    'sepia': {
      filterType: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    'marvin': {
      filterType: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    'phobos': {
      filterType: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    'heat': {
      filterType: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    },
    'none': {}
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
    if (effect === 'none' || effect === undefined) {
      window.utilities.hideElement(effectLevelElement);
    } else {
      window.utilities.showElement(effectLevelElement);
      window.slider.pinElement.focus();
    }
    var effectClass = 'effects__preview--' + effect;
    window.imageUpload.imgPreviewElement.classList.add(effectClass);
  };

  var effectsListElementClickHandler = function (evt) {
    var effectTypeName = evt.target.value;
    currentEffect = effectTypeMap[effectTypeName];
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
