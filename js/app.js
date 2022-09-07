'use strict';

let numberRows = 0;
let numberColumns = 0;
let numberTiles = 20;
let positions = [];
let positionRows = [];
let positionColumns = [];
let tiles = []; // Array that will hold the data for all the tiles currently in play
let firstTileSelected = [];
let tileImages = [
  'breakfast-pix.png',
  'bus-pix.png',
  'bicycle-pix.png',
  'cable-car-pix.png',
  'canoe-pix.png',
  'checking-pix.png',
  'compass-pix.png',
  'cruise-pix.png',
  'desert-pix.png',
  'distance-pix.png',
  'flippers-pix.png',
  'helicopter-pix.png',
  'keycard-pix.png',
  'luggage-pix.png',
  'mountain-pix.png',
  'plane-pix.png',
  'scooter-pix.png',
  'time-pix.png',
  'train-pix.png',
  'van-pix.png',
];
let tileImages2 = [
  'breakfast.png',
  'bus.png',
  'bicycle.png',
  'cable-car.png',
  'canoe.png',
  'checking.png',
  'compass.png',
  'cruise.png',
  'desert.png',
  'distance.png',
  'flippers.png',
  'helicopter.png',
  'keycard.png',
  'luggage.png',
  'mountain.png',
  'plane.png',
  'scooter.png',
  'time.png',
  'train.png',
  'van.png',
];

// Initialize new game, randomly place images on game grid
function initializeGame() {
  // Unhide stats (score/attempts) div and hide Start button
  document.getElementById('start-btn').classList.add('hidden');
  document.querySelector('.stats').classList.remove('hidden');

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
      imageName: tileImages[i].split('.')[0],
      imagePath: `./assets/${tileImages[i]}`,
      tilePosition: positions[i],
    });
  }
  for (let i = positions.length / 2; i < positions.length; i++) {
    addTile({
      imageName: tileImages[i - positions.length / 2].split('.')[0],
      imagePath: `./assets/${tileImages[i - positions.length / 2]}`,
      tilePosition: positions[i],
    });
  }
}

// Populate the tiles on the screen from the tiles array
function displayTiles() {
  for (let tile of tiles) {
    let currentTile = document.querySelector(
      `#${tile.tilePosition} .flip-card-back img`
    );
    currentTile.src = tile.imagePath;
    currentTile.alt = tile.imageName;
  }
}

function handleClickTile(event) {
  // let clickedImage = event.target.alt;
  let clickedElement = event.target.parentNode.parentNode.id;
  let clickedImage = document.querySelector(
    `#${clickedElement} .flip-card-back img`
  ).alt;

  if (typeof clickedElement == 'string') {
    // Add hover class to make tile flip
    document.getElementById(clickedElement).classList.add('hover');

    if (
      firstTileSelected.length !== 0 &&
      clickedElement !== firstTileSelected[1]
    ) {
      // Remove listener for user clicking the tiles area and call response
      document
        .querySelector('.tiles')
        .removeEventListener('click', handleClickTile);
      if (clickedImage == firstTileSelected[0]) {
        // Increment score
        document.getElementById('current-score').textContent =
          Number(document.getElementById('current-score').textContent) + 1;
        // Increment attempts
        document.getElementById('current-attempts').textContent =
          Number(document.getElementById('current-attempts').textContent) - 1;
        // Hide matched tiles
        setTimeout(() => {
          document.getElementById(clickedElement).classList.add('hide-shadow');
          document
            .getElementById(firstTileSelected[1])
            .classList.add('hide-shadow');
          firstTileSelected = [];

          console.log(
            numberTiles,
            Number(document.getElementById('current-score').textContent) * 2
          );
          if (
            numberTiles ==
            Number(document.getElementById('current-score').textContent) * 2
          ) {
            endGame();
          }
          // Listen for user clicking the tiles area and call response
          document
            .querySelector('.tiles')
            .addEventListener('click', handleClickTile);
        }, 1000);
      } else {
        // re-flip tiles
        setTimeout(() => {
          document.getElementById(clickedElement).classList.remove('hover');

          document
            .getElementById(firstTileSelected[1])
            .classList.remove('hover');
          firstTileSelected = [];
          // Listen for user clicking the tiles area and call response
          document
            .querySelector('.tiles')
            .addEventListener('click', handleClickTile);
        }, 1000);
        // attempt increment
        document.getElementById('current-attempts').textContent =
          Number(document.getElementById('current-attempts').textContent) - 1;
      }
      // reset firstTileSelected
    } else {
      firstTileSelected = [clickedImage, clickedElement];
    }
  }
}

function handleButtonClick(event) {
  let clickedElement = event.target.id;
  if (clickedElement == 'start-btn') {
    initializeGame();
    displayTiles();

    // Ensure instructions and game over text is hidden
    document.getElementById('end-game').classList.add('hidden');
    document.getElementById('instructions').classList.add('hidden');

    // Listen for user clicking the tiles area and call response
    document.querySelector('.tiles').addEventListener('click', handleClickTile);
  } else if (clickedElement == 'reset-btn') {
    if (
      confirm('Are you sure you want to reset the score and restart the game?')
    ) {
      window.location.reload();
    }
  } else {
    alert('ERROR: Undefined button element!');
  }
}

function accessLocalStorage(data, setOrGet) {
  if (setOrGet === 'set') {
    localStorage.setItem('highScore', JSON.stringify(data));
    return true;
  } else if (setOrGet === 'get') {
    let returnData = JSON.parse(localStorage.getItem('highScore'));
    if (returnData !== null) {
      return returnData;
    } else {
      return 0;
    }
  } else {
    alert('ERROR: Invalid set or get argument!');
  }
}

function endGame() {
  // Remove listener for user clicking the tiles area and call response
  document
    .querySelector('.tiles')
    .removeEventListener('click', handleClickTile);

  // Display Game Over text
  document.getElementById('end-game').classList.remove('hidden');

  // Check high score -> notify it high score beat and store locally

  let currentScore = document.getElementById('current-attempts').textContent;
  let highScore = accessLocalStorage('', 'get');
  if (highScore < currentScore) {
    let errCheck = accessLocalStorage(currentScore, 'set');

    // Check to make sure set operation functioned properly
    if (!errCheck)
      alert(
        'ERROR: Something went wrong with setting the high score in local storage!'
      );

    alert('You got a new high score! Congratulations!!');

    // Display new High Score
    document.querySelector('#high-score').textContent = currentScore;
  }
}

// Display Current High Score from Local Storage or 0 if none
document.querySelector('#high-score').textContent = accessLocalStorage(
  '',
  'get'
);

// Hide stats (score/attempts) div
document.querySelector('.stats').classList.add('hidden');

// Ensure instructions are displayed
document.getElementById('instructions').classList.remove('hidden');

// Listen for user clicking a button
document
  .getElementById('start-btn')
  .addEventListener('click', handleButtonClick);
document
  .getElementById('reset-btn')
  .addEventListener('click', handleButtonClick);
