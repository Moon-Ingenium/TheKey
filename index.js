const modal = document.getElementById("myModal");
let breakHour = 3600;
let noteItem = localStorage.getItem('note');
let currentTime = moment().format('LT');
let time = document.getElementById('time').textContent = currentTime;
/* -- Convert degrees to radians (actually unused here :-) -- */
function deg2rad(d) { return (2 * d / 360) * Math.PI; }
/* -- Progress the clock's hands every once in a while -- */
setInterval(() => {
    let minute = document.getElementById("minute");
    let hour = document.getElementById("hour");
    let second = document.getElementById("second");
    /* -- note retracing by 90 degrees, this is just the way I calculated the hands, the "0" angle is at 3PM, not 12PM, -- */
    let S = new Date().getSeconds() * 6 - 90;
    let M = new Date().getMinutes() * 6 - 90;
    let H = new Date().getHours() * 30 - 90;
    second.style.transform = 'rotate(' + S + 'deg)';
    minute.style.transform = 'rotate(' + M + 'deg)';
    hour.style.transform = 'rotate(' + H + 'deg)';

}, 10); /* -- update the clock fast enough -- */
/* -- Helps calculate the angle of each hand on the clock -- */
function vec2ang(x, y) {
    angleInRadians = Math.atan2(y, x);
    angleInDegrees = (angleInRadians / Math.PI) * 180.0;
    return angleInDegrees;
}
/* -- Let's calculate position and angle of clock's notches-- */
let nc = document.getElementById("notch-container");
let angle = 0;
let rotate_x = 120;
let rotate_y = 0;
/* -- Calculate the 60 notches for seconds and minutes -- */
for (let i = 0; i < 60; i++) {
    let thin = document.createElement("div");
    let x = rotate_x * Math.cos(angle) - rotate_y * Math.cos(angle);
    let y = rotate_y * Math.cos(angle) + rotate_x * Math.sin(angle);
    let r = vec2ang(x, y);
    thin.className = "thin";
    thin.style.left = 122 + x + "px";
    thin.style.top = 127 + y + "px";
    thin.style.transform = "rotate(" + r + "deg)";
    nc.appendChild(thin);
    angle += (Math.PI / 300) * 10;
}
// reset angle parameters
angle = 0; rotate_x = 120; rotate_y = 0;
/* -- Calculate the thicker notches for hour hand -- */
for (let i = 0; i < 12; i++) {
    let notch = document.createElement("div");
    let x = rotate_x * Math.cos(angle) - rotate_y * Math.cos(angle);
    let y = rotate_y * Math.cos(angle) + rotate_x * Math.sin(angle);
    let r = vec2ang(x, y);
    notch.className = "notch";
    notch.style.left = 122 + x + "px";
    notch.style.top = 127 + y + "px";
    notch.style.transform = "rotate(" + r + "deg)";
    nc.appendChild(notch);
    angle += (Math.PI / 60) * 10;
}
// new card for timer count with an alert once time is up for a break
const timer = document.getElementById('base-timer-label');
// Timer countdown to begin
function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);
    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds = time % 60;
    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}
let weekdayEl = document.getElementById('weekday');
let momentDay = moment().format('dddd');
let calendarDay = moment().format('ll');
weekdayEl.innerHTML = momentDay;
let calendarEl = document.getElementById('calendar-day');
calendarEl.innerHTML = calendarDay;
// add API to display a new quote per day

// create Break Timer


const timerElCard = document.querySelector(".break-card");
let face = document.getElementById("lazy").textContent = formatTime(breakHour);
const breakBtnEl = document.getElementById("start-break-timer");
let myTimer;

function startCountdown() {
    if (!localStorage.getItem('timer')) {
        breakHour = 3600;
    }
    else {
        breakHour = JSON.parse(localStorage.getItem('timer'));

    }
    breakBtnEl.innerHTML = '<i class="fa fa-stop"></i>';
    myTimer = setInterval(function () {
        face = document.getElementById("lazy").textContent = formatTime(breakHour);
        localStorage.setItem('timer', breakHour);
        if (breakHour <= 0) {
            alert("Take a break!")
            stopTime();
        }
        breakHour--;
    }, 1000)


}

// pauseTimer();
function stopTime() {
    clearInterval(myTimer);
    breakBtnEl.innerHTML = '<i class="fa fa-play"></i>';
    breakHour = 3600;
    face = document.getElementById("lazy").textContent = formatTime(breakHour);
}
// function pauseTimer(breakHour){
//     if (breakHour>0){
//         breakBtnEl.addEventListener("click", stopTime);
//     }

// }
breakBtnEl.addEventListener("click", stopTime);

let api = new XMLHttpRequest();
let queryURL = "https://api.adviceslip.com/advice";
// Setup our listener to process completed requests
api.onload = function () {
    // Process our return data
    if (api.status >= 200 && api.status < 300) {
        // This will run when the request is successful
        let res = JSON.parse(api.responseText);
        let adviceObject = res.slip.advice;
        document.querySelector(".daily-qoute").innerHTML = ' " ' + adviceObject + ' " ';

    } else {
        // This will run when it's not
        console.log('The request failed!');
    }

}
api.open('GET', queryURL);
api.send();

let api2 = new XMLHttpRequest();
let meme = "https://meme-api.herokuapp.com/gimme";

// Setup our listener to process completed requests
api2.onload = function () {
    // Process our return data
    if (api2.status >= 200 && api2.status < 300) {
        // This will run when the request is successful
        let response = JSON.parse(api2.response);
        document.querySelector(".dog").setAttribute("src", (response.url));
    } else {
        // This will run when it's not
        console.log('The request failed!');
    }

}
api2.open('GET', meme);
api2.send();

let noteEl = document.getElementById('Textarea1');
let saveBtnEl = document.querySelector('.save');
let clearBtnEl = document.querySelector('.clear');
let quickNote = noteEl.value;
// getting notes from local storage
window.onload = function getNotes() {
    if (localStorage.getItem('note') && localStorage.getItem('note') != '') {
        noteEl.textContent = noteItem;
    }
    face = document.getElementById("lazy").textContent = formatTime(localStorage.getItem('timer'));
    startCountdown();
}
// save notes to local storage
saveBtnEl.addEventListener("click", function () {
    let quickNote = noteEl.value;
    localStorage.setItem('note', quickNote)
    modal.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// clear notes
clearBtnEl.addEventListener("click", function () {
    noteEl.value = "";
    localStorage.removeItem('note', quickNote)
});
