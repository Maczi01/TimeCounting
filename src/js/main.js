let counter = 0;
let timeLeft = 15;
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
        showMinutes(timeLeft - counter);
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
    'radius': 50,
    'centerX': 50,
    'centerY': 50,
    'thickness': 10,
    'offset': -Math.PI/2,
    'color': '#ffffff',
    'bgColor': '#ff230f',
    'idFont': '11px Verdana',
    'valueFont': '56px Teko',
    'fontColor': '#ffffff',
    'lineCap': 'round'
};

let context = canva.getContext('2d');

const angleToRadian = function(angle) {
    return Math.PI/180 * angle;
}

function drawCircle(value) {
    // var start = specs.offset;
    var start = angleToRadian(0);
    // var between = 2 * Math.PI * (value-timeLeft)/timeLeft + specs.offset;
    var between = ((timeLeft-value)/timeLeft)*angleToRadian(360);
    var end = angleToRadian(360);

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
    context.closePath();
    context.fill();



// draw text
    context.fillStyle = specs.fontColor;
    context.font = specs.valueFont;
    context.fillText(showMinutes(value), specs.radius - context.measureText(showMinutes(value)).width / 2, specs.radius * 2 - specs.thickness * 4);

}