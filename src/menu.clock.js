const clockText = document.getElementsByClassName("menu-clock")[0];

const days = "월화수목금토일";
let time;

setInterval(() => {
    time = new Date();
    //6월 1일(일)오후 7:34
    clockText.innerHTML = `${time.getMonth()}월${time.getDay()}일(${days[time.getDay()]
        })`;
    clockText.innerHTML += time.getHours() < 13 ? "오전" : "오후";
    clockText.innerHTML += ` ${time.getHours() % 12}:${time.getMinutes()}`;
}, 1000);
