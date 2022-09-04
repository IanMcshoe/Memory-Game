# Software Requirements

## Vision

This application uses the fun of playing a game to help people improve mental capabilities and memory. This is accomplished by having the player recall where images are hidden on a grid of concealed items, in an attempt to identify matching pairs. The user receives a score according to their level of success, giving them an opportunity to beat previous high scores and see their memory improve over time.

## Scope (In/Out)

IN:

- The application will display tiles on the screen that represent hidden images for the user to match into pairs
- App will allow users to click on tiles to select them and give results of success or failure of match to user, and score accordingly
- App will retain scores and high score in local storage

OUT:

- App will not retain stores scores beyond the current browser and user

## MVP functionality

Users need to be able to attempt to find pairs of images from a group of hidden images. They will only be allowed to uncover two images at a time. When a match is found, their score is incremented. If the two they uncover do not match they are re-hidden and the game continues. A high score is kept in local storage for comparison to the current game score. Current score and total attempts/guesses will be stored locally and displayed.

## Stretch Goals

- Add animation/transformation top hover and click actions over tiles
- Add ability to display and compare previous score results graphically

## Functional Requirements

- User can select tiles by clicking on them, to find hidden pairs
- User can see current and high scores on screen

## Data Flow

See [Domain Model](./domain-model.png)
