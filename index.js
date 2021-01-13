const calendar = document.getElementById('caleandar');
// make a date display using monent
// add items to that day




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

let addBttnEl = document.querySelector("#add");
let deleteBttnEl = document.querySelector("#delete");

function addResource() {
    let cardEl = document.querySelector(".resource-body");
    const input = document.querySelector("#link").value;
    const pEl = document.createElement("p");
    const aEl = document.createElement("a").setAttribute("href", input);
    cardEl.appendChild(pEl);
    pEl.appendChild(aEl);
}

