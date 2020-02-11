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
};

let Excercise = function(title, preparingTime, excerciseTime, numberOfExcercises, rounds, restTime){
    this.title = title;
    this.preparingTime = preparingTime;
    this.excerciseTime = excerciseTime;
    this.numberOfExcercises = numberOfExcercises;
    this.rounds = rounds;
    this.restTime = restTime;
};

export {createExcercise, Excercise}