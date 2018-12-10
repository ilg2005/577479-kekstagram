'use strict';

var MIN_PICTURE_NUM = 1;
var MAX_PICTURE_NUM = 25;
var MIN_AVATAR_NUM = 1;
var MAX_AVATAR_NUM = 6;
var MIN_LIKES_NUM = 15;
var MAX_LIKES_NUM = 200;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var SENTENCES = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
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
var MULTIPLICAND = 100;
var MIN_SCALE_VALUE = '25%';
var MAX_SCALE_VALUE = '100%';
var SCALE_STEP = '25%';
var DEFAULT_EFFECT_LEVEL = '100%';
var ESC_KEYCODE = 27;
var SLIDER_PIN_WIDTH = 18;

var pictureTemplateElement = document.querySelector('#picture').content;
var picturesElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var uploadFileElement = document.querySelector('#upload-file');
var pictureEditingElement = document.querySelector('.img-upload__overlay');
var cancelEditingElement = pictureEditingElement.querySelector('#upload-cancel');
var uploadPreviewElement = pictureEditingElement.querySelector('.img-upload__preview');
var imgPreviewElement = uploadPreviewElement.querySelector('img');
var scaleSmallerElement = pictureEditingElement.querySelector('.scale__control--smaller');
var scaleBiggerElement = pictureEditingElement.querySelector('.scale__control--bigger');
var scaleValueElement = pictureEditingElement.querySelector('.scale__control--value');
var effectsListElement = pictureEditingElement.querySelector('.effects__list');
var effectLevelElement = pictureEditingElement.querySelector('.effect-level');
var sliderPinElement = pictureEditingElement.querySelector('.effect-level__pin');
var sliderLineElement = pictureEditingElement.querySelector('.effect-level__depth');
var sliderEffectLevelValueElement = pictureEditingElement.querySelector('.effect-level__value');
var hashtagsElement = pictureEditingElement.querySelector('.text__hashtags');
var commentsElement = pictureEditingElement.querySelector('.text__description');

var pictureNumbers;
var currentEffect;

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

var createArrayFromRange = function (min, max) {
  var numbers = [];
  for (var i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

var getRandomIndex = function (array) {
  return Math.round(Math.random() * (array.length - 1));
};

var getRandomValue = function (array) {
  return array[getRandomIndex(array)];
};

var getRandomInRange = function (min, max) {
  var array = createArrayFromRange(min, max);
  return getRandomValue(array);
};

var getUniqueRandomValue = function (array) {
  var uniqueRandomValue = getRandomValue(array);
  array.splice(array.indexOf(uniqueRandomValue), 1);
  return uniqueRandomValue;
};

var generateCommentsForPicture = function (commentsArray) {
  var commentsClone = commentsArray.slice();
  var commentsNumber = getRandomIndex(commentsClone);
  var commentsForPicture = [];
  if (commentsNumber !== 0) {
    for (var i = 0; i <= commentsNumber; i++) {
      commentsForPicture.push(getUniqueRandomValue(commentsClone));
    }
  }
  return commentsForPicture;
};

var createPicture = function () {
  var picture = {
    url: 'photos/' + getUniqueRandomValue(pictureNumbers) + '.jpg',
    likes: getRandomInRange(MIN_LIKES_NUM, MAX_LIKES_NUM),
    comments: generateCommentsForPicture(COMMENTS),
    description: getRandomValue(SENTENCES)
  };
  return picture;
};

var createPicturesArray = function (picturesNum) {
  var pictures = [];
  for (var i = 0; i < picturesNum; i++) {
    pictures.push(createPicture());
  }
  return pictures;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

  return pictureElement;
};

var renderSimilarPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesElement.appendChild(fragment);
};

var generateCommentsFragment = function (comments) {
  var commentsFragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
    var newLi = document.createElement('li');
    newLi.classList.add('social__comment');

    var newImg = document.createElement('img');
    newImg.classList.add('social__picture');
    newImg.src = 'img/avatar-' + getRandomInRange(MIN_AVATAR_NUM, MAX_AVATAR_NUM) + '.svg';
    newImg.alt = 'Аватар комментатора фотографии';
    newImg.width = '35';
    newImg.height = '35';
    newLi.appendChild(newImg);

    var newP = document.createElement('p');
    newP.classList.add('social__text');
    newP.textContent = comment;
    newLi.appendChild(newP);

    commentsFragment.appendChild(newLi);
  });
  return commentsFragment;
};

var generateBigPictureData = function (picture) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  bigPictureElement.querySelector('.social__comments').innerHTML = '';
  bigPictureElement.querySelector('.social__comments').appendChild(generateCommentsFragment(picture.comments));

  hideElement(bigPictureElement.querySelector('.social__comment-count'));
  hideElement(bigPictureElement.querySelector('.comments-loader'));
};

var cancelImageEditing = function () {
  hideElement(pictureEditingElement);
  document.removeEventListener('keydown', documentKeydownEscHandler);
  uploadFileElement.value = '';
};

var cancelEditingElementClickHandler = function () {
  cancelImageEditing();
};

var documentKeydownEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== hashtagsElement && evt.target !== commentsElement) {
    cancelImageEditing();
  }
};

var increaseScaleValue = function () {
  var currentScaleValue = scaleValueElement.value;
  if (currentScaleValue !== MAX_SCALE_VALUE) {
    var newScaleValue = parseInt(currentScaleValue, 10) + parseInt(SCALE_STEP, 10);
    scaleValueElement.value = newScaleValue + '%';
  }
  return newScaleValue / MULTIPLICAND;
};

var decreaseScaleValue = function () {
  var currentScaleValue = scaleValueElement.value;
  if (currentScaleValue !== MIN_SCALE_VALUE) {
    var newScaleValue = parseInt(currentScaleValue, 10) - parseInt(SCALE_STEP, 10);
    scaleValueElement.value = newScaleValue + '%';
  }
  return newScaleValue / MULTIPLICAND;
};

var scaleSmallerElementClickHandler = function () {
  var decimalValueOfPercent = decreaseScaleValue();
  uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
};

var scaleBiggerElementClickHandler = function () {
  var decimalValueOfPercent = increaseScaleValue();
  uploadPreviewElement.style.transform = 'scale(' + decimalValueOfPercent + ')';
};

var changeEffectLevel = function (type, level, unit) {
  imgPreviewElement.style.filter = type + '(' + level + unit + ')';
};

var convertPinPositionToEffectLevel = function () {
  sliderEffectLevelValueElement.value = parseInt(sliderPinElement.style.left, 10);
  var effectLevel = ((currentEffect.max - currentEffect.min) * sliderEffectLevelValueElement.value / MULTIPLICAND) + currentEffect.min;
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
    var newPinPositionInPercent = Math.round(newPinPosition * MULTIPLICAND / sliderLineWidth);

    if (newPinPositionInPercent <= MULTIPLICAND && newPinPositionInPercent >= 0) {
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
    showElement(effectLevelElement);
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
      hideElement(effectLevelElement);
      break;
  }
  changeEffectType(effectTypeName);
};

var uploadFileElementChangeHandler = function () {
  showElement(pictureEditingElement);
  hideElement(effectLevelElement);
  cancelEditingElement.addEventListener('click', cancelEditingElementClickHandler);
  document.addEventListener('keydown', documentKeydownEscHandler);
  scaleSmallerElement.addEventListener('click', scaleSmallerElementClickHandler);
  scaleBiggerElement.addEventListener('click', scaleBiggerElementClickHandler);
  effectsListElement.addEventListener('click', effectsListElementClickHandler);
  sliderPinElement.addEventListener('mousedown', sliderPinElementMouseDownHandler);
};

var init = function () {
  uploadFileElement.addEventListener('change', uploadFileElementChangeHandler);
  pictureNumbers = createArrayFromRange(MIN_PICTURE_NUM, MAX_PICTURE_NUM);
  var similarPictures = createPicturesArray(MAX_PICTURE_NUM);
  renderSimilarPictures(similarPictures);
  generateBigPictureData(similarPictures[0]);
  // showElement(bigPictureElement);
};

init();

