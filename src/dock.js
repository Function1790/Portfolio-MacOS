const programIcons = document.getElementsByClassName("program-icon-wrap");
const programIconsInner = document.getElementsByClassName("program-icon");

function setClassName(index, className) {
    if (index < 0 || index >= programIconsInner.length) {
        return;
    }
    programIconsInner[index].className = className;
}

function gotFocus(event) {
    this.icon.className = "program-icon focus";
    setClassName(this.index - 1, "program-icon focus-around")
    setClassName(this.index + 1, "program-icon focus-around")
}

function lostFocus(event) {
    this.icon.className = "program-icon";
    setClassName(this.index - 1, "program-icon")
    setClassName(this.index + 1, "program-icon")
}

for (var i in programIcons) {
    programIcons[i].index = Number(i)
    programIcons[i].icon = programIconsInner[i];
    programIcons[i].onmouseenter = gotFocus;
    programIcons[i].onmouseleave = lostFocus;
}