class PlayGame {
  #resultEl = document.querySelector('.js-results');
  #scoreEl = document.querySelector('.js-score');
  #moveEl = document.querySelector('.js-move');
  #score = JSON.parse(localStorage.getItem('score')) || {you: 0, computer: 0};
  #audioEl = document.createElement("audio");
  #isPlaying = true;
  intervalId;
  compMove;
  
  constructor(){
    this.#scoreEl.textContent = `You ${this.#score.you} : ${this.#score.computer} comp`;
    this.#score = JSON.parse(localStorage.getItem('score')) || {you: 0, computer: 0};
    this.#audioEl.volume = .5;
    document.querySelector('.container').appendChild(this.#audioEl);
  }

  computerPlay(){
    const randomMove = Math.floor(Math.random()*3)+1;
  
    if(randomMove === 1){
      this.compMove = 'rock';
    }else if(randomMove === 2){
      this.compMove = 'paper';
    }else{
      this.compMove = 'scissors';
    }
  
    return this.compMove;
  }

  playSound(soundSrc){
    this.#audioEl.src = soundSrc;
    this.#audioEl.play();
  }

  userPlay(userMove){
    let results;
  
    if(userMove === 'rock'){
       this.compMove = this.computerPlay();
    
      if(this.compMove === 'rock'){
        this.playSound('kick.mp3');
        results = 'Tie';
      }else if(this.compMove === 'paper'){
        this.playSound('crash.mp3');
        this.#score.you++;
        results = 'You Win';
      }else{
        this.playSound('snare.mp3');
        results = 'You Loss';
        this.#score.computer++;
      }
  
      this.saveToStorage();
    }
    
    else if(userMove === 'paper'){
      this.compMove = this.computerPlay();
    
      if(this.compMove === 'rock'){
        this.playSound('crash.mp3');
        results = 'You Win';
        this.#score.you++;
      }else if(this.compMove === 'paper'){
        this.playSound('kick.mp3');
        results = 'Tie';
      }else{
        this.playSound('snare.mp3');
        results = 'You Loss';
        this.#score.computer++;
      }
  
      this.saveToStorage();
    }
    
    else{
       this.compMove = this.computerPlay();
      if(this.compMove === 'rock'){
        this.playSound('snare.mp3');
        results = 'You Loss';
        this.#score.computer++;
      }else if(this.compMove === 'paper'){
        this.playSound('crash.mp3');
        results = 'You Win';
        this.#score.you++;
      }else{
        this.playSound('kick.mp3');
        results = 'Tie';
      }
  
      this.saveToStorage();
    }
    
    this.#resultEl.textContent = results;
    this.#moveEl.innerHTML = `
      you <div class="move-icon"><span class="you js-you">${userMove.slice(0,1).toUpperCase()}</span></div> 
      <span class="separator">:</span>
      <div class="move-icon"><span class="comp js-comp">${this.compMove.slice(0,1).toUpperCase()}</span></div> computer
    `;
    this.#scoreEl.textContent = `You ${this.#score.you} : ${this.#score.computer} comp`;
  
  }

  saveToStorage(){
    localStorage.setItem('score', JSON.stringify(this.#score));
  }

  resetScore(){
    document.querySelector('.js-prompt-container').style.display = 'block';
    document.querySelector('.js-yes-btn').addEventListener('click', () => {
      localStorage.removeItem('score');
      this.#score.computer = 0;
      this.#score.you = 0;
      this.saveToStorage();
      this.#moveEl.innerHTML = '';
      this.#resultEl.textContent = '';
      this.#scoreEl.textContent = `You ${this.#score.you} : ${this.#score.computer} comp`;
  
      document.querySelector('.js-prompt-container').style.display = 'none';    
      
    });
  
    document.querySelector('.js-no-btn').addEventListener('click', () => {
      document.querySelector('.js-prompt-container').style.display = 'none';
    });
  }

  autoPlay(){
    if(this.#isPlaying){
      document.querySelector('.js-autoplay-btn')
        .textContent = 'Stop AP';
      this.intervalId = setInterval(() => {
        let randomMove = this.computerPlay();
        this.userPlay(randomMove);
      }, 1000);
      this.#isPlaying = false;
    }else{
      this.#isPlaying = true;
      clearInterval(this.intervalId);
      document.querySelector('.js-autoplay-btn')
        .textContent = 'AutoPlay';
    }

  }

  keyBordPress(event){
    if(event.key === 'r'){
      this.userPlay('rock');
    }else if(event.key === 'p'){
      this.userPlay('paper');
    }else if(event.key === 's'){
      this.userPlay('scissors');
    }else if(event.key === 'Backspace'){
      this.resetScore();
    }else if(event.key === 'Enter'){
      this.autoPlay();
    }
  }

  clickedButton(button){
    const dom = document.querySelector(`.js-${button}-btn`);
  
    if(button == 'rock' || button == 'paper' || button == 'scissors'){
        dom.addEventListener('click', () => {
        this.userPlay(button);
      });
    }else if(button == 'reset'){
        dom.addEventListener('click', () => {
        this.resetScore();
      });
    }else if(button == 'autoplay'){
        dom.addEventListener('click', () => {
         this.autoPlay();
      });
    }else if(button == 'keyboard'){
      document.body.addEventListener('keydown', (event) => {
        this.keyBordPress(event)
      });
    }
  }
}
const PlayGameOOP = new PlayGame();
PlayGameOOP.clickedButton('rock');
PlayGameOOP.clickedButton('paper');
PlayGameOOP.clickedButton('scissors');
PlayGameOOP.clickedButton('reset');
PlayGameOOP.clickedButton('autoplay');
PlayGameOOP.clickedButton('keyboard');
