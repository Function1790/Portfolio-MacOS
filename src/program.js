const desktopHTML = document.getElementsByClassName("desktop")[0]
var programsHTML = document.getElementsByClassName("program")
var programList = []

var lastFocusedProgram = null;

function programHTML(name, contentHTML) {
    return `
    <div class="program ${name}">
                <div class="program-topbar flex-row">
                    <div class="program-topbar-buttons flex-row">
                        <div class="program-circle circle1"></div>
                        <div class="program-circle circle2"></div>
                        <div class="program-circle circle3"></div>
                    </div>
                    <div class="program-title center">${name}</div>
                    <div></div>
                </div>
                <div class="program-content">
                    ${contentHTML}
                </div>
            </div>
    `
}

function getGithub() {
    return programHTML('github', `
        <div class="github-root flex-col">
            <div class="github-head flex-row">
                <div class="github-profile">
                    <img src="/img/profile.png">
                </div>
                <div class="github-name center">Function</div>
            </div>
            <div class="github-container flex-col">
                <div class="github-repository">
                    <div class="repository-title">T-SHOP</div>
                    <div class="repository-content">서령제 동아리 상점</div>
                </div>
            </div>
        </div>
    `)
}

function reload() {
    //programList.push(new Program(programsHTML[programsHTML.length - 1]))
    //console.log(programList[0].element)
    programList = []
    for (var i = 0; i < programsHTML.length; i++) {
        programList.push(new Program(programsHTML[i]))
    }
}

function runProgram(name) {
    switch (name) {
        case 'github':
            desktopHTML.innerHTML += getGithub()
            reload()
            break
    }
}

function onMousemove(e) {
    if (e.buttons == 1) {
        var pos = [e.movementX + this.parent.pos[0], e.movementY + this.parent.pos[1]]
        this.parent.setLocation(pos[0], pos[1])
    }
}

function onFocus(event) {
    if (lastFocusedProgram) {
        lastFocusedProgram.style.zIndex = 1
    }
    this.style.zIndex = 1000
    lastFocusedProgram = this
}

// TODO : click 중첩
class Program {
    constructor(element) {
        this.element = element
        element.onmousedown = onFocus
        this.topbar = element.getElementsByClassName("program-topbar")[0]
        this.topbar.parent = this
        this.topbar.onmousemove = onMousemove
        this.pos = [0, 0]
        this.isClicked = false
        if (element.style.left != "") {
            var _pos = [element.style.left.replace("px", ""), element.style.top.replace("px", "")]
            var _pos = [Number(_pos[0]), Number(_pos[1])]
            this.setLocation(_pos[0], _pos[1])
        } else {
            this.setLocation(100, 100)
        }
    }
    setLocation(x, y) {
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
        this.pos = [x, y]
    }
}