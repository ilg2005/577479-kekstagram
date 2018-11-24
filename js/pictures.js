'use strict';

var MIN_PICTURE_NUM = 1;
var MAX_PICTURE_NUM = 25;
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

var pictureTemplateElement = document.querySelector('#picture').content;
var picturesElement = document.querySelector('.pictures');

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

var pictureNumbers = createArrayFromRange(MIN_PICTURE_NUM, MAX_PICTURE_NUM);

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
    likes: getRandomValue(createArrayFromRange(MIN_LIKES_NUM, MAX_LIKES_NUM)),
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

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  picturesElement.appendChild(fragment);
};

var init = function () {
  console.log(createPicturesArray(MAX_PICTURE_NUM));
};

init();

