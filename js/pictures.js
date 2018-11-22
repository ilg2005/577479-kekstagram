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

var createArrayFromRange = function (min, max) {
  var numbers = [];
  for (var i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
};

var getRandomValue = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var picture = {
  url: 'photos/' + getRandomValue(createArrayFromRange(MIN_PICTURE_NUM, MAX_PICTURE_NUM)) + '.jpg',
  likes: getRandomValue(createArrayFromRange(MIN_LIKES_NUM, MAX_LIKES_NUM)),
  comments: getRandomValue(COMMENTS),
  description: getRandomValue(SENTENCES)
};

console.log(picture.url);
console.log(picture.likes);
console.log(picture.comments);
console.log(picture.description);
