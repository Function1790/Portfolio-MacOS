// 'lastFocusedProgram', 'desktopHTML' have been declared
// in /src/program.js
const dragRectHTML = document.getElementsByClassName('drag-rect')[0];
var isMousedownOnBackgound = false;
var dragStartPos = [0, 0]

function setDragStartPos(x, y) {
    dragRectHTML.style.left = `${x}px`;
    dragRectHTML.style.top = `${y}px`;
    dragStartPos = [x, y];
}

desktopHTML.onmousedown = (event) => {
    // 바탕화면 클릭시
    if (event.target == desktopHTML) {
        setDragStartPos(event.x, event.y)
        dragRectHTML.style.display = 'flex';
        isMousedownOnBackgound = true;
    }
}

desktopHTML.onmouseup = (event) => {
    dragRectHTML.style.width = '0px';
    dragRectHTML.style.height = '0px';
    dragRectHTML.style.display = 'none';
    isMousedownOnBackgound = false;
}

desktopHTML.onmousemove = (event) => {
    if (!isMousedownOnBackgound) {
        return;
    }
    var width = event.x - dragStartPos[0]
    var height = event.y - dragStartPos[1]
    if (width >= 0) {
        dragRectHTML.style.left = `${dragStartPos[0]}px`;
        dragRectHTML.style.width = `${width}px`;
    } else {
        dragRectHTML.style.left = `${event.x}px`;
        dragRectHTML.style.width = `${-width}px`;
    }
    if (height >= 0) {
        dragRectHTML.style.top = `${dragStartPos[1]}px`;
        dragRectHTML.style.height = `${height}px`;
    } else {
        dragRectHTML.style.top = `${event.y}px`;
        dragRectHTML.style.height = `${-height}px`;
    }
}