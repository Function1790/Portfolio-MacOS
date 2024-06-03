const desktopHTML = document.getElementsByClassName("desktop")[0]
var programsHTML = document.getElementsByClassName("program")
var programList = []

var lastFocusedProgram = null;

function print(data) {
    console.log(data)
}

function programHTML(name, contentHTML, hidden = "hidden") {
    return `
    <div class="program ${name} hidden">
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

function getCalc() {
    return programHTML('calc', `<div class="calc-root flex-col">
    <div class="calc-result-area flex-col"></div>
    <div class="calc-button-area flex-col">
        <div class="calc-row flex-row">
            <div class="calc-button">AC</div>
            <div class="calc-button">±</div>
            <div class="calc-button">%</div>
            <div class="calc-button">÷</div>
        </div>
        <div class="calc-row flex-row">
            <div class="calc-button">7</div>
            <div class="calc-button">8</div>
            <div class="calc-button">9</div>
            <div class="calc-button">×</div>
        </div>
        <div class="calc-row flex-row">
            <div class="calc-button">4</div>
            <div class="calc-button">5</div>
            <div class="calc-button">6</div>
            <div class="calc-button">-</div>
        </div>
        <div class="calc-row flex-row">
            <div class="calc-button">1</div>
            <div class="calc-button">2</div>
            <div class="calc-button">3</div>
            <div class="calc-button">+</div>
        </div>
        <div class="calc-row flex-row">
            <div class="calc-button calc-long">0</div>
            <div class="calc-button">.</div>
            <div class="calc-button">=</div>
        </div>
    </div>
</div>`)
}

function reload() {
    //programList.push(new Program(programsHTML[programsHTML.length - 1]))
    //console.log(programList[0].element)
    programList = []
    for (var i = 0; i < programsHTML.length; i++) {
        if (programsHTML[i].className.indexOf("calc") != -1) {
            programList.push(new Calculator(programsHTML[i]))
            continue
        }
        programList.push(new Program(programsHTML[i]))
    }
}

function runProgram() {
    desktopHTML.innerHTML += getGithub()
    desktopHTML.innerHTML += getCalc()
    reload()
}

function openProgram(name) {
    for(var i=0; i<programsHTML.length; i++){
        if(programsHTML[i].className.indexOf(name)!=-1){
            programsHTML[i].classList.remove('hidden')
            onFocus(null, programsHTML[i], '0.1s')
            break
        }
    }
}

function onMousemove(e) {
    if (e.buttons == 1) {
        var pos = [e.movementX + this.parent.pos[0], e.movementY + this.parent.pos[1]]
        this.parent.setLocation(pos[0], pos[1])
    }
}

function onFocus(event, target=this, transition='0s') {
    if (lastFocusedProgram) {
        lastFocusedProgram.style.zIndex = 1
    }
    target.style.zIndex = 10
    target.style.transition = transition;
    lastFocusedProgram = target
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
        this.headButtons = element.getElementsByClassName('program-circle')
        this.headButtons[0].onclick = () => {
            this.element.style.transition = '0.1s';
            this.element.classList.add('hidden')
        }
    }
    setLocation(x, y) {
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`
        this.pos = [x, y]
    }
}

function processCalcFuncBtn(element) {
    var data = element.innerHTML
    if (data == "AC") {
        element.parent.resultHTML.innerHTML = ""
        return
    }
    element.parent.writeSymbol(data)
}

function onClickCalcBtn() {

    var data = Number(this.innerHTML)
    if (isNaN(data)) {
        processCalcFuncBtn(this)
        return
    }
    this.parent.writeSymbol(data)
}

class Calculator extends Program {
    constructor(element) {
        super(element)
        this.resultHTML = element.getElementsByClassName('calc-result-area')[0]
        this.buttonsHTML = element.getElementsByClassName('calc-button')
        this.init()
    }
    init() {
        for (var i = 0; i < this.buttonsHTML.length; i++) {
            this.buttonsHTML[i].parent = this
            this.buttonsHTML[i].onclick = onClickCalcBtn
        }
    }
    writeSymbol(data) {
        this.resultHTML.innerHTML += data
    }
}

runProgram()