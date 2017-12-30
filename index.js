var CADiv = document.getElementById("CA")
var height = Math.floor(window.innerHeight / 25)
var width = Math.floor(window.innerWidth / 25) - 1
var cells = width
var prevRow
var genration = 0
var rule = []
var scrollLoop
var mainLoop

setRuleNo(parseInt(Math.random() * 256));

function getRandomRow() {
    row = []
    for (var i = 0; i < cells; i++) {
        row.push(Math.floor(Math.random() * 2))
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
    document.getElementById("rule").innerText = "rule:" + parseInt(rule.join(''), 2) + " : " + rule.join('') + " grid size:" + width + "x" + height
    document.getElementById("ruleNo").value = parseInt(rule.join(''), 2)

    document.getElementById('svg_5').attributes.fill.value = rule[0] == 1 ? '#000' : '#fff'
    document.getElementById('svg_9').attributes.fill.value = rule[1] == 1 ? '#000' : '#fff'
    document.getElementById('svg_13').attributes.fill.value = rule[2] == 1 ? '#000' : '#fff'
    document.getElementById('svg_17').attributes.fill.value = rule[3] == 1 ? '#000' : '#fff'
    document.getElementById('svg_21').attributes.fill.value = rule[4] == 1 ? '#000' : '#fff'
    document.getElementById('svg_25').attributes.fill.value = rule[5] == 1 ? '#000' : '#fff'
    document.getElementById('svg_29').attributes.fill.value = rule[6] == 1 ? '#000' : '#fff'
    document.getElementById('svg_33').attributes.fill.value = rule[7] == 1 ? '#000' : '#fff'

    document.getElementById("CA").innerHTML = ""
    genration = 0
    if (mainLoop > 0) { clearInterval(mainLoop) }
    if (scrollLoop > 0) { clearInterval(scrollLoop) }
    mainLoop = setInterval(loop, 0);
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
    if (genration == 1) {
        prevRow = getRandomRow()
        return prevRow
    }
    row = []
    for (var i = 0; i < cells; i++) {
        var l = i == 0 ? prevRow[cells - 1] : prevRow[i - 1]
        var n = prevRow[i]
        var r = i == cells - 1 ? prevRow[0] : prevRow[i + 1]

        var cell = setCell(l, n, r)
        row.push(cell)
    }
    prevRow = row
    return row
}

function renderRow(row) {
    var rowDiv = document.createElement("div")
    rowDiv.className = "rowDiv"
    for (var i of row) {
        var block = document.createElement("block")
        block.className = i ? "active box" : "inactive box"
        rowDiv.appendChild(block)
    }
    return rowDiv;
}

function scroll() {
    CADiv.removeChild(CADiv.childNodes[0])
    CADiv.appendChild(renderRow(getNextRow()))
}

function loop() {
    CADiv.appendChild(renderRow(getNextRow()))
    if (genration > height) {
        clearInterval(mainLoop)
        scrollLoop = setInterval(scroll, 1000)
    }
}

function setRule() {
    setRuleNo(document.getElementById("ruleNo").value)
}

function setRandomRule() {
    setRuleNo(parseInt(Math.random() * 256));
}


document.getElementById('svg_5').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 128)
document.getElementById('svg_9').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 64)
document.getElementById('svg_13').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 32)
document.getElementById('svg_17').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 16)
document.getElementById('svg_21').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 8)
document.getElementById('svg_25').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 4)
document.getElementById('svg_29').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 2)
document.getElementById('svg_33').onclick = () => setRuleNo(document.getElementById("ruleNo").value ^ 1)




navigator.serviceWorker.register('serviceWorker.js');

navigator.serviceWorker.ready.then(console.log('service worker registered'));