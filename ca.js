var CA=[]
var cells=100
function getRandomRow(){
    row=[]
    for (var i=0;i<cells;i++){
        row.push(Math.floor(Math.random()*2))
    }
    return row
}
var prevRow
function nextRow(){
    prevRow = getNextRow(prevRow) || getRandomRow()
    CA.push(prevRow)
}

function getNextRow(prevRow){
    if(!prevRow)
        return undefined
    row=[]
    for (var i=0;i<cells;i++){
        row.push(prevRow[i]?0:1)
    }
    return row
}

nextRow()
nextRow()
nextRow()

for (i of CA){
    console.dir(i)
}