'use strict';

let numberRows = 0;
let numberColumns = 0;
let numberTiles = 20;
let positions = [];
let positionRows = [];
let positionColumns = [];
let tileImages = [
  'breakfast.jpg',
  'bus.jpg',
  'bycicle.jpg',
  'cable-car.jpg',
  'canoe.jpg',
  'checking.jpg',
  'compass.jpg',
  'cruise.jpg',
  'desert.jpg',
  'distance.jpg',
  'flippers.jpg',
  'helicopter.jpg',
  'keycard.jpg',
  'luggage.jpg',
  'mountain.jpg',
  'plane.jpg',
  'scooter.jpg',
  'time.jpg',
  'train.jpg',
  'van.jpg',
];

let tiles = []; // Array taht will hold the data for all the tiles currently in play

function initializeGame() {
  switch (numberTiles) {
    case 20:
      numberRows = 4;
      numberColumns = 5;
      break;
    case 40:
      numberRows = 5;
      numberColumns = 8;
      break;
    default:
      alert('ERROR: Number of tiles is not valid!');
  }

  // Create array of row positions
  let randomRow = 0;
  let foundNumber = false;
  for (let x = 0; x < numberRows; x++) {
    while (!foundNumber) {
      let randomNumber = Math.floor(Math.random() * numberRows + 1);
      if (!positionRows.includes(randomNumber)) {
        positionRows[x] = randomNumber;
        foundNumber = true;
      }
    }
    foundNumber = false;
  }

  // Create an array of column positions
  for (let x = 0; x < numberColumns; x++) {
    while (!foundNumber) {
      let randomNumber = Math.floor(Math.random() * numberColumns + 1);
      if (!positionColumns.includes(randomNumber)) {
        positionColumns[x] = randomNumber;
        foundNumber = true;
      }
    }
    foundNumber = false;
  }

  generateRandomPositionArray();
}

// Create constructor to hold data about each tile
function TileData(imageName, imagePath, tilePosition) {
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.tilePosition = tilePosition;
}

// Declare function to create an object from an array of data and append it from an array
function addTile(data) {
  tiles.push(new TileData(data.imageName, data.imagePath, data.tilePosition));
}

// Populate the tiles array that holds the name, file location and screen position data for all the tiles
function generateRandomPositionArray() {
  //Create array of tile positions to fill
  for (let xPos of positionColumns) {
    for (let yPos of positionRows) {
      positions.push(`pos-${xPos}-${yPos}`);
    }
  }

  // Create an array with tile names, image file locations and position on the screen
  for (let i = 0; i < positions.length / 2; i++) {
    addTile({
      // imageName: tileImages[i],
      imageName: tileImages[i].split('.')[0],
      imagePath: `./assets/${tileImages[i]}`,
      tilePosition: positions[i],
    });
  }
  for (let i = positions.length / 2; i < positions.length; i++) {
    addTile({
      // imageName: tileImages[i - positions.length / 2],
      imageName: tileImages[i - positions.length / 2].split('.')[0],
      imagePath: `./assets/${tileImages[i - positions.length / 2]}`,
      tilePosition: positions[i],
    });
  }
}

initializeGame();

console.log(tiles);
