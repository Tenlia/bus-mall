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
  // console.log(newImage);
  for(var i = 0; i < currentDisplay.length; i++) {
    while(newImage === currentDisplay[i]){
      newImage = randomNum();
      // console.log('we found a duplicate number');
    }
  }
  picture.src = productsArray[newImage].productLink;
  currentDisplay.push(newImage);
}

function displayThree() {
  displayProduct(left);
  displayProduct(center);
  displayProduct(right);
}

function compareArrays() {
  displayThree();
  var j = 0;
  while(j < previousDisplay.length) {
    for(var i = 0; i < currentDisplay.length; i++) {
      if(currentDisplay[i] === previousDisplay[j]) {
        currentDisplay = [];
        compareArrays();
        // console.log('duplicates were found between arrays');
      }
    }
    j++;
  }
}

function refreshing() {
  compareArrays();
  previousDisplay = currentDisplay;
  currentDisplay = [];
  console.log('this is the currentDisplay', currentDisplay);
  console.log('this is the previousDisplay', previousDisplay);
}
// refreshing();
container.addEventListener('click', refreshing(), false);
// function makingPicture() {
//   var i = 0;
//   var match = false;
//   while(!match && i < currentDisplay.length) {
//     if(imgArray[randomNum] === currentDisplay[i]) {
//       match = true;
//     }else {
//       i++;
//     }
//   }
//   if(!match) {
//     var productImg = document.createElement('img');
//     productImg.src = imgArray[randomNum];
//     products.appendChild(productImg);
//     currentDisplay.push(imgArray[randomNum]);
//   }else {
//     makingPicture();
//   }
// };
//
// function checkDisplay() {
//   makingPicture();
//   var j = 0;
//   while(j < previousDisplay.length) {
//     for(var i = 0; i < currentDisplay.length; i++) {
//       if(currentDisplay[i] === previousDisplay[j]) {
//         currentDisplay = [];
//         console.log(i);
//       }
//       j++;
//       console.log(j);
//     }
//   }
// };
//
// function clearHTML() {
//   products.removeChild('img');
// }
//
// function moveArrays() {
//   currentDisplay = previousDisplay;
//   previousDisplay = [];
// };
//
// function runEverything() {
//   if(turns < 25) {
//     clearHTML();
//     checkDisplay();
//     checkDisplay();
//     checkDisplay();
//     turns++;
//   }else{
//     products.removeEventListener();
//   }
//   console.log(currentDisplay);
//   console.log(previousDisplay);
// };
//
// checkDisplay();
// checkDisplay();
// checkDisplay();
//
// products.addEventListener('click', runEverything);
