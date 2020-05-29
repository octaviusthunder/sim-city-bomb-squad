document.addEventListener('DOMContentLoaded', function() {
  /* --------- DOM REFS ---------*/
  let body = document.querySelector('body');
  let wireBox = document.getElementById('wirebox');
  let resetBtn = document.getElementById('reset');
  let timer = document.getElementById('timer');

  /* --------- Game Logic Variables ------- */
  const STARTING_TIME = 30;
  let remainingTime = 0;
  let gameOver = false;
  let countdown = null; // will hold my countdown interval

  let wiresToCut = [];

  let wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
  }

  /* ----- Event Listeners ------ */
  resetBtn.addEventListener('click', reset);
  wireBox.addEventListener('click', wireClick);

  function reset() {
  timer.classList.remove("green");
  body.classList.remove("flat");
  for (let wire in wireState) {
      wireState[wire] = false;
  }
  wiresToCut = [];

  for (let i = 0; i < wireBox.children.length; i++) {
      let color = wireBox.children[i].id;
      wireBox.children[i].src = "img/uncut-" + color + "-wire.png";
  }

  init()
}

  function init() {
    remainingTime = STARTING_TIME;
    gameOver = false;

    // set wires to cut
    for (const color in wireState) {
      let randoNum = Math.random();
      if (randoNum > 0.5) {
        wiresToCut.push(color)
      }
    }

    // FOR DEBUGGING
    console.log(wiresToCut)
    countdown = setInterval(updateClock, 100)
    resetBtn.disabled = true;
  }

  function wireClick(e) {
    console.log("You clicked " + e.target.id)
    let color = e.target.id;
    if (gameOver === false && wireState[color] === false) {
        e.target.src = "img/cut-" + color + "-wire.png";
        wireState[color] = true;
        // if wire has index, it needs to be cut
        let wireIndex = wiresToCut.indexOf(color);
        if (wireIndex > -1) {
            console.log("Correct!")
            wiresToCut.splice(wireIndex, 1)
            if (wiresToCut.length < 1) {
                endGame(true);
             }
             
        } else {
            console.log("Bad news bears")
            endGame(false);
        }
      }       
    }

  function updateClock() {
    remainingTime--

    //remainingTime = remainingTime - 1
    timer.textContent = "00:00:" + remainingTime;
    if (remainingTime <= 0) {
        endGame(false)
    }
  }
  
  function endGame(win) {
      console.log("Win is " + win);

      clearInterval(countdown)
      gameOver = true;
      resetBtn.disabled = false;
      if (win) {
          timer.classList.add("green");
      } else {
          body.classList.add("flat");
      }
     }

})