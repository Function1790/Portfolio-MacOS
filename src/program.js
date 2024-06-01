const programsHTML = document.getElementsByClassName("program")
const programList = []

function onMousemove(e) {
    if (e.buttons == 1) {
        var pos = [e.movementX + this.parent.pos[0], e.movementY + this.parent.pos[1]]
        this.parent.setLocation(pos[0], pos[1])
    }
}

class Program {
    constructor(element) {
        this.element = element
        this.topbar = element.getElementsByClassName("program-topbar")[0]
        this.topbar.parent = this
        this.topbar.onmousemove = onMousemove
        this.pos = [0, 0]
        this.isClicked = false
        this.setLocation(100, 100)
    }
    setLocation(x, y) {
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
        this.pos = [x, y]
    }
}

for (var i = 0; i < programsHTML.length; i++) {
    programList.push(new Program(programsHTML[i]))
}