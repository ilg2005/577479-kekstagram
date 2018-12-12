'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = '100%';
  var effectsListElement = window.uploadImage.pictureEditingElement.querySelector('.effects__list');

  window.imageEffects = {
    imgPreviewElement: window.uploadImage.uploadPreviewElement.querySelector('img'),
    effectLevelElement: window.uploadImage.pictureEditingElement.querySelector('.effect-level'),
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

  var resetSliderSettingsToDefault = function () {
    window.imageEffects.imgPreviewElement.className = '';
    window.slider.sliderPinElement.style.left = DEFAULT_EFFECT_LEVEL;
    window.slider.sliderLineElement.style.width = DEFAULT_EFFECT_LEVEL;
    window.imageEffects.imgPreviewElement.style.filter = '';
  };

  var changeEffectType = function (effect) {
    resetSliderSettingsToDefault();
    if (effect !== 'none') {
      window.utilities.showElement(window.imageEffects.effectLevelElement);
    }
    var effectClass = 'effects__preview--' + effect;
    window.imageEffects.imgPreviewElement.classList.add(effectClass);
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
        window.utilities.hideElement(window.imageEffects.effectLevelElement);
        break;
    }
    changeEffectType(effectTypeName);
  };

  effectsListElement.addEventListener('click', effectsListElementClickHandler);
})();
