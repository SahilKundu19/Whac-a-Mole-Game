const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard=document.querySelector('.score');
let lastHole;
let timeUp=false;
let score=0;

function randomTime(min,max){
return Math.round(Math.random() * (max-min) + min)
}

  function randomHole(holes) {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    if (hole === lastHole) {
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

function UP(){
    const time=randomTime(400,1500);
    const hole=randomHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
        hole.classList.remove('up');
        if(!timeUp) UP()
    },time)
}

function startGame(){
    scoreBoard.textContent=0;
    timeUp=false;
    score=0;
    UP();
    setTimeout(()=>timeUp=true,10000)
}

function whack(e){
    if(!e.isTrusted) return;
    score++
    this.parentNode.classList.remove('up')
    scoreBoard.textContent=score;
}

moles.forEach(mole=>mole.addEventListener('click',whack));