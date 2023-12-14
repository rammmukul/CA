let canvas = document.getElementById("canvas")
let scale = document.getElementById("scale")
let skewInput = document.getElementById("skew")
let body = document.querySelector("body")
let context = canvas.getContext("2d")

let prevRow
let genration = 0
let rule = []
let mainLoop
let seed = 0
let skew
let SCALE_FACTOR
let height
let width
let extraWidth
let cells
let count = 0

function setScale() {
    SCALE_FACTOR = parseInt(scale.value)
    height = Math.floor(window.innerHeight / SCALE_FACTOR)
    width = Math.floor(window.innerWidth / SCALE_FACTOR)
    extraWidth = window.innerWidth - width * SCALE_FACTOR
    cells = width
    setRule()
    console.log({ SCALE_FACTOR })
}
setScale()
scale.onchange = setScale

function setSkew() {
    skew = parseFloat(skewInput.value)
    setRule()
    console.log({ skew })
}
setSkew()
skewInput.onchange = setSkew

body.onresize = function () {
    setScale()
}

function random() {
    const number = Math.random()
    return ((number + skew / 100) > 1) ? 1 : 0
}


setRuleNo(parseInt(Math.random() * 256));

function getFirstRow() {
    row = []
    for (let i = 0; i < cells; i++) {
        row.push(random())
    }
    return row
}

function getSingleCell() {
    row = []
    for (var i = 0; i < cells; i++) {
        row.push(i == cells / 2 ? 1 : 0)
    }
    return row
}

function getInt(e) { return parseInt(e, 10) }
function setRuleNo(no) {
    rule = ('000000000' + parseInt(no, 10).toString(2)).substr(-8).split('').map(getInt)
    document.getElementById("rule").innerText = "rule:" + parseInt(rule.join(''), 2) + " : " + parseInt(rule.join(''), 10);
    document.getElementById("ruleNo").value = parseInt(rule.join(''), 2)

    document.getElementById('svg_5').attributes.fill.value = rule[0] == 1 ? '#000' : '#fff'
    document.getElementById('svg_9').attributes.fill.value = rule[1] == 1 ? '#000' : '#fff'
    document.getElementById('svg_13').attributes.fill.value = rule[2] == 1 ? '#000' : '#fff'
    document.getElementById('svg_17').attributes.fill.value = rule[3] == 1 ? '#000' : '#fff'
    document.getElementById('svg_21').attributes.fill.value = rule[4] == 1 ? '#000' : '#fff'
    document.getElementById('svg_25').attributes.fill.value = rule[5] == 1 ? '#000' : '#fff'
    document.getElementById('svg_29').attributes.fill.value = rule[6] == 1 ? '#000' : '#fff'
    document.getElementById('svg_33').attributes.fill.value = rule[7] == 1 ? '#000' : '#fff'

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    genration = 0
    if (mainLoop > 0) { cancelAnimationFrame(mainLoop) }
    for (let i = 0; i < height; i++) {
        loop()
    }
    mainLoop = requestAnimationFrame(function animate() {
        let speed = 20 / SCALE_FACTOR
        for (let i = 0; i < speed; i++) {
            loop()
        }
        mainLoop = requestAnimationFrame(animate)
    })
}

function setCell(l, n, r) {
    if (l == 1 && n == 1 && r == 1)
        return rule[0]
    if (l == 1 && n == 1 && r == 0)
        return rule[1]
    if (l == 1 && n == 0 && r == 1)
        return rule[2]
    if (l == 1 && n == 0 && r == 0)
        return rule[3]
    if (l == 0 && n == 1 && r == 1)
        return rule[4]
    if (l == 0 && n == 1 && r == 0)
        return rule[5]
    if (l == 0 && n == 0 && r == 1)
        return rule[6]
    if (l == 0 && n == 0 && r == 0)
        return rule[7]
}

function getNextRow() {
    genration++
    if (genration % height == 1) {
        prevRow = getFirstRow()
        return prevRow
    }
    row = []
    for (let i = 0; i < cells; i++) {
        let l = i == 0 ? prevRow[cells - 1] : prevRow[i - 1]
        let n = prevRow[i]
        let r = i == cells - 1 ? prevRow[0] : prevRow[i + 1]

        let cell = setCell(l, n, r)
        row.push(cell)
    }
    prevRow = row
    return row
}

function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

function renderRow(row) {
    let rowToRender = (genration - 1) % height

    context.fillStyle = "#ff000020"
    context.fillRect(0, SCALE_FACTOR * (rowToRender + 1), window.innerWidth, SCALE_FACTOR)
    context.clearRect(0, SCALE_FACTOR * (rowToRender), window.innerWidth, SCALE_FACTOR)
    for (let [i, value] of Object.entries(row)) {
        context.fillStyle = value ? `rgba(0, 0, 0, ${clamp(1 / SCALE_FACTOR * 300, 50, 100)}%)` : `rgba(255, 255, 255, ${clamp(1 / SCALE_FACTOR * 300, 50, 100)}%)`
        context.fillRect(extraWidth / 2 + SCALE_FACTOR * i, SCALE_FACTOR * (rowToRender), SCALE_FACTOR - 1, SCALE_FACTOR - 1)
    }
}

function scroll() {
    console.log('scrolling')
    context.fillStyle = "#00000000"
    context.fillRect(0, SCALE_FACTOR * (genration - 1), window.innerWidth, SCALE_FACTOR)
    renderRow(getNextRow(), genration)
}

function loop() {
    renderRow(getNextRow(), genration)
}

function setRule() {
    setRuleNo(typeof parseInt(document.getElementById("ruleNo").value) == "number" ?
        document.getElementById("ruleNo").value : 0)
}

function setRandomRule() {
    setRuleNo(parseInt(Math.random() * 256));
}


document.getElementById('svg_2').onclick =
document.getElementById('svg_3').onclick =
document.getElementById('svg_4').onclick =
document.getElementById('svg_5').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 128)

document.getElementById('svg_6').onclick =
document.getElementById('svg_7').onclick =
document.getElementById('svg_8').onclick =
document.getElementById('svg_9').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 64)

document.getElementById('svg_10').onclick =
document.getElementById('svg_11').onclick =
document.getElementById('svg_12').onclick =
document.getElementById('svg_13').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 32)

document.getElementById('svg_14').onclick =
document.getElementById('svg_15').onclick =
document.getElementById('svg_16').onclick =
document.getElementById('svg_17').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 16)

document.getElementById('svg_18').onclick =
document.getElementById('svg_19').onclick =
document.getElementById('svg_20').onclick =
document.getElementById('svg_21').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 8)

document.getElementById('svg_22').onclick =
document.getElementById('svg_23').onclick =
document.getElementById('svg_24').onclick =
document.getElementById('svg_25').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 4)

document.getElementById('svg_26').onclick =
document.getElementById('svg_27').onclick =
document.getElementById('svg_28').onclick =
document.getElementById('svg_29').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 2)

document.getElementById('svg_30').onclick =
document.getElementById('svg_31').onclick =
document.getElementById('svg_32').onclick =
document.getElementById('svg_33').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 1)

navigator.serviceWorker.register('serviceWorker.js')

navigator.serviceWorker.ready.then(console.log('service worker registered'))