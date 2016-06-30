'use strict';

var productImg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var start = document.getElementById('start');
var container = document.getElementById('container');
var left = document.getElementById('left');
var center = document.getElementById('center');
var right = document.getElementById('right');
var percentTable = document.getElementById('percentTable');

var turns = 0;

var productsArray = [];
var previousDisplay = [];
var currentDisplay = [];

var namesArray = [];
var tallyArray = [];
var shownArray = [];

var tallyLocalArray = [];
var shownLocalArray = [];

container.className = 'hidden';
showHide.className = 'hidden';
results.className = 'hidden';

function Product(name, link) {
  this.productName = name;
  this.productLink = link;
  this.productTally = 0;
  this.productTotalShown = 0;
}

function makingProducts() {
  for(var i = 0; i < productImg.length; i++) {
    var picToName = productImg[i].slice(0,-4);
    var picToLink = ('img/' + productImg[i]);
    productsArray.push(new Product(picToName, picToLink));
  }
}

function randomNum() {
  return Math.floor(Math.random() * productImg.length);
}

function unpackLocal() {
  if(localStorage.chartTally) {
    tallyLocalArray = JSON.parse(localStorage.chartTally);
    console.log('this is the tallyLocalArray', tallyLocalArray);
  }else{
    console.log('there was no tallyLocalArray');
  }
  if(localStorage.chartShown) {
    shownLocalArray = JSON.parse(localStorage.chartShown);
    console.log('this is the shownLocalArray', shownLocalArray);
  }else{
    console.log('there was no shownLocalArray');
  }
}

function packToLocal() {
  localStorage.chartTally = (JSON.stringify(tallyArray));
  localStorage.chartShown = (JSON.stringify(shownArray));
  console.log('everything\'s packed');
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

function clearArrays() {
  previousDisplay = currentDisplay;
  currentDisplay = [];
}

function refreshing(event) {
  for(var i = 0; i < productImg.length; i++){
    if(event.target.alt === productsArray[i].productName){
      productsArray[i].productTally += 1;
    }
  }
  compareArrays();
  clearArrays();
  if(turns < 24){
    turns++;
  }else{
    container.removeEventListener('click', refreshing);
    showHide.className = 'active';
    results.className = 'active';
  }
}

function startTest() {
  container.className = 'active';
  compareArrays();
  clearArrays();
  start.className = 'hidden';
  startPara.className = 'hidden';
}

function getArray(property, array) {
  for(var i = 0; i < productsArray.length; i++){
    if(!array[i]){
      array.push(productsArray[i][property]);
    }else{
      array[i] += productsArray[i][property];
    }
  }
  return array;
}

function addingArrays(oldArray, newArray) {
  for(var i = 0; i < oldArray.length; i++) {
    newArray[i] += oldArray[i];
  }
}

function getChartArrays() {
  getArray('productName', namesArray);
  getArray('productTally', tallyArray);
  getArray('productTotalShown', shownArray);

  addingArrays(tallyLocalArray, tallyArray);
  addingArrays(shownLocalArray, shownArray);
}

function createChart() {
  var resultsChart = document.getElementById('results').getContext('2d');
  var hibble = new Chart(resultsChart, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: 'Number of times clicked',
        data: tallyArray,
        backgroundColor: '#ff0a16'
      },{
        label: 'Number of times shown',
        data: shownArray,
        backgroundColor: '#ffffff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createTableHeaders() {
  var trEl = document.createElement('tr');
  trEl.id = 'headerCells';
  var thEl = document.createElement('th');
  thEl.textContent = 'Products';
  trEl.appendChild(thEl);
  var thEl = document.createElement('th');
  thEl.textContent = 'Number of Views';
  trEl.appendChild(thEl);
  var thEl = document.createElement('th');
  thEl.textContent = 'Number of Clicks';
  trEl.appendChild(thEl);
  var thEl = document.createElement('th');
  thEl.textContent = 'Clickthrough Percentage';
  trEl.appendChild(thEl);
  percentTable.appendChild(trEl);
  console.log('table made');
}

function createTableRows() {
  var trEl = document.createElement('tr');
  trEl.id = 'allCells';
  var tdEl = document.createElement('td');
  tdEl.textContent = namesArray[0];
  thEl.appendChild(tdEl);
  var tdEl = document.createElement('td');
  tdEl.textContent = shownArray[0];
  thEl.appendChild(tdEl);
  var tdEl = document.createElement('td');
  tdEl.textContent = tallyArray[0];
  thEl.appendChild(tdEl);
}

function finishedTest() {
  getChartArrays();
  packToLocal();
  showHide.className = 'hidden';
  createChart();
  createTableHeaders();
}

unpackLocal();
makingProducts();

start.addEventListener('click', startTest);
container.addEventListener('click', refreshing);
showHide.addEventListener('click', finishedTest);
