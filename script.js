'use strict';

//Selecting elements
const player0E0 = document.querySelector('.player--0');
const player0El = document.querySelector('.player--1s');
const score0 = document.querySelector('#score--0'); //'.' secelc class '#' select id
const score1 = document.getElementById('score--1'); //inny zapis na id
const diceEl = docuemnt.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore; //declaring variables so that they are available outside of initialization function
let activePlayer;
let scores; //array of both players scores
let playing; //is playing availavle

const switchPlayer = function () {
  //switch to next player
  document.getElementById('current--${activePlayer}').textContent = 0;
  currentScore = 0; //reseting score for active player before switching
  activePlayer = activePlayer == 0 ? 1 : 0; //if active player is 0 then change to active player 1
  //removing active--player class from player 0 and adding to player 1
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const initialization = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0]; //array of both players scores
  playing = true; //is playing availavle
};
initialization(); //running the function so thath it is executed

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6);
    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = 'dice-${dice}.png';
    //check for rolled 1: if true change to next player
    if (dice !== 1) {
      //if its not a 1, add score to current score
      currentScore += dice;
      document.getElementById('current--${activePlayer}').textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById('score--${activePlayer}').textContent =
      scores[activePlayer];
    // Check if players total score is at least 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector('.player--${activePlayer}')
        .classList.add('player--winner');
      document
        .querySelector('.player--${activePlayer}')
        .classList.remove('player--winner');
    } else {
    }
  }
  //switch to next player
  switchPlayer();
});

// Reseting the game
document.querySelector('.btn--new').addEventListener('click', initialization());
