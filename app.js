'use strict';

var productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var container = document.getElementById('container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var turns = 0;

var productsArray = [];
var previousDisplay = [];
var currentDisplay = [];

function Product(name, link) {
  this.productName = name;
  this.productLink = link;
  this.productTally = 0;
  this.productTotalShown = 0;
}

for(var i = 0; i < productImg.length; i++) {
  var picToName = productImg[i].slice(0,-4);
  var picToLink = ('img/' + productImg[i]);
  productsArray.push(new Product(picToName, picToLink));
}

function randomNum() {
  return Math.floor(Math.random() * productImg.length);
}

function displayProduct(picture) {
  var newImage = randomNum();
  for(var i = 0; i < currentDisplay.length; i++) {
    while(newImage === currentDisplay[i]){
      newImage = randomNum();
    }
  }
  picture.src = productsArray[newImage].productLink;
  picture.alt = productsArray[newImage].productName;
  currentDisplay.push(newImage);
}

function displayThree() {
  displayProduct(left);
  displayProduct(center);
  displayProduct(right);
}

function addTimesSeen() {
  var j = 0;
  while(j < productsArray.length){
    for(var i = 0; i < currentDisplay.length; i++){
      if(j === currentDisplay[i]){
        productsArray[j].productTotalShown++;
        console.table(productsArray[j]);
      }
    }
    j++;
  }
}

function compareArrays() {
  displayThree();
  var j = 0;
  while(j < previousDisplay.length) {
    for(var i = 0; i < currentDisplay.length; i++) {
      if(currentDisplay[i] === previousDisplay[j]) {
        currentDisplay = [];
        compareArrays();
      }
    }
    j++;
  }
  addTimesSeen();
}

function clearArrays(){
  previousDisplay = currentDisplay;
  currentDisplay = [];
  console.log('this is the currentDisplay', currentDisplay);
  console.log('this is the previousDisplay', previousDisplay);
}

function refreshing(event) {
  // console.log(event.target.alt);
  for(var i = 0; i < productImg.length; i++){
    if(event.target.alt === productsArray[i].productName){
      productsArray[i].productTally += 1;
    }
  }
  console.table(productsArray);
  compareArrays();
  clearArrays();
}

compareArrays();
clearArrays();

container.addEventListener('click', refreshing);
