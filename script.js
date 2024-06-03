'use strict';

//
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const hold = document.querySelector('.btn--hold');
const img = document.querySelector('img');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

//switch player func
const switchplayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  current0.textContent = currentScore;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let playing, currentScore, activePlayer, scores;

// When start the game
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add('hidden');
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

//When player click roll
roll.addEventListener('click', function () {
  if (playing) {
    //Genarating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');

    //Displaying dice
    img.src = `dice-${dice}.png`;

    //Check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchplayer();
    }
  }
});

//When player click hold
hold.addEventListener('click', function () {
  if (playing) {
    //Adding current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Check player score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch player func
      switchplayer();
    }
  }
});

//When player click New game
btnNew.addEventListener('click', init);
