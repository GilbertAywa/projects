const resultEl = document.querySelector('.js-results');
const scoreEl = document.querySelector('.js-score');
const moveEl = document.querySelector('.js-move');
const audioEl = document.createElement("audio");
audioEl.src;
audioEl.volume = .5;
document.querySelector('.container').appendChild(audioEl);
let isPlaying = true;
let intervalId;
let compMove;

const score = JSON.parse(localStorage.getItem('scoreF')) || {you: 0, computer: 0};
scoreEl.textContent = `You ${score.you} : ${score.computer} comp`;

function saveToStorage(){
  localStorage.setItem('scoreF', JSON.stringify(score));
}

function computerPlay(){
  const randomMove = Math.floor(Math.random()*3)+1;

  if(randomMove === 1){
    compMove = 'rock';
  }else if(randomMove === 2){
    compMove = 'paper';
  }else{
    compMove = 'scissors';
  }

  return compMove;
};

function playSound(soundSrc){
  audioEl.src = soundSrc;
  audioEl.play();
}

function userPlay(userMove){
  let results;

  if(userMove === 'rock'){
    const compMove = computerPlay();
  
    if(compMove === 'rock'){
      playSound('kick.mp3');
      results = 'Tie';
    }else if(compMove === 'paper'){
      playSound('crash.mp3');
      results = 'You Win';
      score.you++;
    }else{
      playSound('snare.mp3');
      results = 'You Loss';
      score.computer++;
    }

    saveToStorage();
  }
  
  else if(userMove === 'paper'){
    let compMove = computerPlay();
  
    if(compMove === 'rock'){
      playSound('crash.mp3');
      results = 'You Win';
      score.you++;
    }else if(compMove === 'paper'){
      playSound('kick.mp3');
      results = 'Tie';
    }else{
      playSound('snare.mp3');
      results = 'You Loss';
      score.computer++;
    }

    saveToStorage();
  }
  
  else{
    let compMove = computerPlay();
    if(compMove === 'rock'){
      playSound('snare.mp3');
      results = 'You Loss';
      score.computer++;
    }else if(compMove === 'paper'){
      playSound('crash.mp3');
      results = 'You Win';
      score.you++;
    }else{
      playSound('kick.mp3');
      results = 'Tie';
    }

    saveToStorage();
  }
  
  resultEl.textContent = results;
  moveEl.innerHTML = `
    you <div class="move-icon"><span class="you js-you">${userMove.slice(0,1).toUpperCase()}</span></div> 
    <span class="separator">:</span>
    <div class="move-icon"><span class="comp js-comp">${compMove.slice(0,1).toUpperCase()}</span></div> computer
  `;
  scoreEl.textContent = `You ${score.you} : ${score.computer} comp`;

  return 1;
};

function resetScore(){
  document.querySelector('.js-prompt-container').style.display = 'block';
  document.querySelector('.js-yes-btn').addEventListener('click', () => {
    localStorage.removeItem('scoreF');
    score.computer = 0;
    score.you = 0;
    saveToStorage();
    moveEl.innerHTML = '';
    resultEl.textContent = '';
    scoreEl.textContent = `You ${score.you} : ${score.computer} comp`;

    document.querySelector('.js-prompt-container').style.display = 'none';    
    
  });

  document.querySelector('.js-no-btn').addEventListener('click', () => {
    document.querySelector('.js-prompt-container').style.display = 'none';
  });
}

function autoPlay(){
  if(isPlaying){
    document.querySelector('.js-autoplay-btn')
      .textContent = 'Stop AP';
    intervalId = setInterval(() => {
      let randomMove = computerPlay();
      userPlay(randomMove);
    }, 1000);
    isPlaying = false;
  }else{
    isPlaying = true;
    clearInterval(intervalId);
    document.querySelector('.js-autoplay-btn')
      .textContent = 'AutoPlay';
  }

}

function keyBordPress(event){
  if(event.key === 'r'){
    userPlay('rock');
  }else if(event.key === 'p'){
    userPlay('paper');
  }else if(event.key === 's'){
    userPlay('scissors');
  }else if(event.key === 'Backspace'){
    resetScore();
  }else if(event.key === 'Enter'){
    autoPlay();
  }
}

function clickedButton(button){
  const dom = document.querySelector(`.js-${button}-btn`);

  if(button == 'rock' || button == 'paper' || button == 'scissors'){
      dom.addEventListener('click', () => {
      userPlay(button);
    });
  }else if(button == 'reset'){
      dom.addEventListener('click', () => {
      resetScore();
    });
  }else if(button == 'autoplay'){
      dom.addEventListener('click', () => {
     autoPlay();
    });
  }else if(button == 'keyboard'){
    document.body.addEventListener('keydown', (event) => {
      keyBordPress(event)
    });
  }
}

clickedButton('rock');
clickedButton('paper');
clickedButton('scissors');
clickedButton('reset');
clickedButton('autoplay');
clickedButton('keyboard');
