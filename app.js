'use strict';

var imgArray = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var previousDisplay = [];
var currentDisplay = [];
var tallyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var turns = 0;
var products = document.getElementById('products');

function makingPicture() {
  var randomNum = Math.floor(Math.random() * 19);
  var i = 0;
  var match = false;
  while(!match && i < currentDisplay.length) {
    if(imgArray[randomNum] === currentDisplay[i]) {
      match = true;
    }else {
      i++;
    }
  }
  if(!match) {
    var productImg = document.createElement('img');
    productImg.src = imgArray[randomNum];
    products.appendChild(productImg);
    currentDisplay.push(imgArray[randomNum]);
  }else {
    makingPicture();
  }
};

function checkDisplay() {
  makingPicture();
  var j = 0;
  while(j < previousDisplay.length) {
    for(var i = 0; i < currentDisplay.length; i++) {
      if(currentDisplay[i] === previousDisplay[j]) {
        currentDisplay = [];
        console.log(i);
      }
      j++;
      console.log(j);
    }
  }
};

function clearHTML() {
  products.removeChild('img');
}

function moveArrays() {
  currentDisplay = previousDisplay;
  previousDisplay = [];
};

function runEverything() {
  if(turns < 25) {
    clearHTML();
    checkDisplay();
    checkDisplay();
    checkDisplay();
    turns++;
  }else{
    products.removeEventListener();
  }
  console.log(currentDisplay);
  console.log(previousDisplay);
};

checkDisplay();
checkDisplay();
checkDisplay();

products.addEventListener('click', runEverything);
