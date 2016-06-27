'use strict';

var imgArray = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/bathroom.jpg', 'img/boots.jpg', 'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];
var displayArray = [];
var tallyArray = [];
var products = document.getElementById('products');

function makingPicture() {
  var randomNum = Math.floor(Math.random() * 19);
  var i = 0;
  var match = false;
  while(!match && i < displayArray.length) {
    if(randomNum === displayArray[i]) {
      match = true;
    }else {
      i++;
    }
  }
  if(!match) {
    displayArray.push(randomNum);
    var productImg = document.createElement('img');
    productImg.src = imgArray[randomNum];
    products.appendChild(productImg);
  }else {
    makingPicture();
  }
};

makingPicture();

products.addEventListener('click', makingPicture);
