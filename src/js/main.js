let counter = 0;
let timeLeft = 100;
const canva = document.querySelector('#canva');
const playButton = document.querySelector('.counteer__settings--play--js');
const pauseButton = document.querySelector('.counteer__settings--pause');
const stopButton = document.querySelector('.counteer__settings--stop');
var specs = {
    'radius': 120,
    'centerX': 120,
    'centerY': 120,
    'thickness': 20,
    'offset': -Math.PI / 2,
    'color': '#ffffff',
    'bgColor': '#ff230f',
    'idFont': '11px Verdana',
    'valueFont': '80px Teko',
    'fontColor': '#ffffff',
    'lineCap': 'round'
};
let context = canva.getContext('2d');
playButton.addEventListener('click', play);
pauseButton.addEventListener('click', pauseToPlay);
stopButton.addEventListener('click', stop);
window.onload = function () {
    drawCircle(0);
    console.log(listOfExcercises)
};
let listOfExcercises = [];
let interval;
const hamburger = document.querySelector(".counteer__menu--hamburger");
const list = document.querySelector('.mainMenu');
hamburger.addEventListener('click', () => {
    list.classList.toggle('mainMenu--visible')
});

let Excercise = function(title, preparingTime, excerciseTime, numberOfExcercises, rounds, restTime){
    this.title = title;
    this.preparingTime = preparingTime;
    this.excerciseTime = excerciseTime;
    this.numberOfExcercises = numberOfExcercises;
    this.rounds = rounds;
    this.restTime = restTime;
};

function createExcercise(){
    let newTitle = document.querySelector('.content__item--title--input').value;
    let newPreparingTime  = document.querySelector('.content__item--preparing--input').value;
    let newExcerciseTime = document.querySelector('.content__item--excercise--input').value;
    let newNumberOfExcercise = document.querySelector('.content__item--number--input').value;
    let newRounds = document.querySelector('.content__item--number--input').value;
    let newRestTime = document.querySelector('.content__item--rest--input').value;
    let newExcercise = new Excercise(newTitle, newPreparingTime, newExcerciseTime, newNumberOfExcercise, newRounds, newRestTime);
    listOfExcercises.push(newExcercise);
    console.log(listOfExcercises)
}

const chooseExcercise = document.querySelector('.mainMenu--item__choose');
const chooseExcerciseModal = document.querySelector('.chooseExcerciseModal');
const addExcerciseModal = document.querySelector('.addExcerciseModal');
const addExcercise = document.querySelector('.mainMenu--item__add');
const declineNewExcercise = document.querySelector('.content__action--decline');
const acceptNewExcercise = document.querySelector('.content__action--accept');
const manage = document.querySelector('.mainMenu--item__manage');

const modal = document.getElementById("newExcercise");

addExcercise.addEventListener('click', () =>{
    addExcerciseModal.style.display = "block";
});
declineNewExcercise.addEventListener('click', () => {
    addExcerciseModal.style.display = "none";
});
acceptNewExcercise.addEventListener('click', createExcercise);

chooseExcercise.addEventListener('click', () => {
    chooseExcerciseModal.style.display = "block";
});
window.addEventListener('click', (e) => {
    if(e.target === chooseExcerciseModal){
        chooseExcerciseModal.style.display = "none";
    }
})


function showMinutes(s) {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    if (seconds.toString().length === 1) {
        seconds = '0' + seconds
    }
    return `${minutes} : ${seconds}`;
}

function counting() {
    interval = setInterval(timeIt, 1000);
}

function timeIt() {
    counter++;
    console.log(counter)
    // showMinutes(timeLeft - counter);
    drawCircle(counter);
    if (counter === timeLeft) {
        clearInterval(interval)
    }
}


function play() {
    counting();
    playButton.classList.remove('counteer__settings--play')
    playButton.classList.add('counteer__settings--play_nonvisibility')
    pauseButton.classList.add('counteer__settings--pause_nonvisability');
    pauseButton.classList.remove('counteer__settings--pause_visability');
}

function pauseToPlay() {
    clearInterval(interval)
    playButton.classList.add('counteer__settings--play')
    playButton.classList.remove('counteer__settings--play_nonvisibility')
    pauseButton.classList.remove('counteer__settings--pause_nonvisability');
    pauseButton.classList.add('counteer__settings--pause_visability');
}

function stop() {
    counter = 0;
    clearInterval(interval);
    drawCircle(0);
    pauseButton.classList.remove('counteer__settings--pause_nonvisability');
    pauseButton.classList.add('counteer__settings--pause_visability');
    playButton.classList.add('counteer__settings--play')
    playButton.classList.remove('counteer__settings--play_nonvisibility')
}


const angleToRadian = function (angle) {
    return Math.PI / 180 * angle;
}

function drawCircle(value) {
    // var start = specs.offset;
    let start = angleToRadian(0);
    // var between = 2 * Math.PI * (value-timeLeft)/timeLeft + specs.offset;
    let between = ((timeLeft - value) / timeLeft) * angleToRadian(360);
    let end = angleToRadian(360);


    // clear canvas
    context.clearRect(0, 0, specs.centerX * 2, specs.centerY * 2);

    // draw remaining %
    context.fillStyle = specs.color;
    context.beginPath();
    //ctx.lineCap="round";
    context.arc(specs.centerX, specs.centerY, specs.radius, start, between);

    context.arc(specs.centerX, specs.centerY, specs.radius - specs.thickness, between, start, true);
//ctx.stroke();
    context.closePath();
    context.fill();

    // draw bg
    context.fillStyle = specs.bgColor;
    context.beginPath();
    //ctx.lineCap="round";
    context.arc(specs.centerX, specs.centerY, specs.radius, between, end);
    // context.arc(specs.centerX, specs.centerY, specs.radius, between, 2*Math.PI);

    context.arc(specs.centerX, specs.centerY, specs.radius - specs.thickness, end, between, true);
    //ctx.stroke();
    // context.closePath();
    context.fill();


// draw text
    context.fillStyle = specs.fontColor;
    context.font = specs.valueFont;
    context.fillText(showMinutes(timeLeft - value), specs.radius - context.measureText(showMinutes(timeLeft - value)).width / 2, specs.radius * 2 - specs.thickness * 5);

// draw line
    context.fillStyle = specs.bgColor;
    context.beginPath()
    context.moveTo(0, -context.height);
    context.lineTo(value, 0);
    context.closePath();
    context.stroke();
}
