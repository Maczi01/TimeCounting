let counter = 0;
let timeLeft = 5;
const canva = document.querySelector('#canva');

function showMinutes(s) {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    if (seconds.toString().length === 1) {
        seconds = '0' + seconds
    }
    return `${minutes} : ${seconds}`;
}

function counting() {
    let timer = document.getElementById('time');
    let interval = setInterval(timeIt, 1000);

    function timeIt() {
        counter++;
        timer.innerHTML = showMinutes(timeLeft - counter);
        drawCircle(counter);
        if (counter === timeLeft) {
            clearInterval(interval);
        }
    }
}

window.onload = function () {
    counting();
}
var specs = {
    'radius': 70,
    'centerX': 70,
    'centerY': 70,
    'thickness': 10,
    'offset': -Math.PI / 2,
    'color': '#ffffff',
    'bgColor': '#8bc5c3',
    'idFont': '11px Verdana',
    'valueFont': 'bold 30px Verdana',
    'fontColor': '#ffffff',
    'lineCap': 'round'
};

let context = canva.getContext('2d');

function drawCircle(value) {
  var start = specs.offset;
  // var between = 2 * Math.PI * parseInt(value) + specs.offset;
  var between = parseInt(value);
  var end = 2 * Math.PI + specs.offset;

  context.clearRect(0, 0, specs.centerX * 2, specs.centerY * 2);

// draw remaining %
  context.fillStyle = specs.color;
  context.beginPath();
//context.lineCap="round";
  context.arc(specs.centerX, specs.centerY, specs.radius, start, between);

  context.arc(specs.centerX, specs.centerY, specs.radius - specs.thickness, between, start, true);
//context.stroke();
  context.closePath();
  context.fill();

  context.fillStyle = specs.bgColor;
  context.beginPath();
//context.lineCap="round";
  context.arc(specs.centerX, specs.centerY, specs.radius, between, end);

  context.arc(specs.centerX, specs.centerY, specs.radius - specs.thickness, end, between, true);
//context.stroke();
  context.closePath();
  context.fill();

// draw text
  context.fillStyle = specs.fontColor;
  context.font = specs.valueFont;
  context.fillText(value, specs.radius - context.measureText(value).width/2, specs.radius*2 - specs.thickness*4);

}