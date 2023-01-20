var Theme = function () {
    // before creating piece you need to initialize these
    // don't remove these!!!

    const spriteResources = "assets/resources"
    const spriteFolder = "alpha"

    const theme = new Object()
    Object.assign(theme, {
        themePath: `${spriteResources}/${spriteFolder}`
    })
    Object.assign(theme, {
        spriteExtension: "png"
    })

    return theme
}()
var Init = function () {

    const initialize = new Object()
    Object.assign(initialize, {
        kingdoms:
            [
                "None",
                "White",
                "Black"
            ]
    })
    Object.assign(initialize, {
        matrices:
            [
                "BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR",
                "BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP",
                "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN",
                "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN",
                "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN",
                "NN", "NN", "NN", "NN", "NN", "NN", "NN", "NN",
                "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP",
                "WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"
            ]
    })
    Object.assign(initialize, {
        pieces:
            [
                {
                    "name": "None",
                    "abbr": "V",
                    "value": null
                },
                {
                    "name": "King",
                    "abbr": "K",
                    "value": 0
                },
                {
                    "name": "Pawn",
                    "abbr": "P",
                    "value": 1
                },
                {
                    "name": "Knight",
                    "abbr": "N",
                    "value": 3
                },
                {
                    "name": "Bishop",
                    "abbr": "B",
                    "value": 4
                },
                {
                    "name": "Rook",
                    "abbr": "R",
                    "value": 5
                },
                {
                    "name": "Queen",
                    "abbr": "Q",
                    "value": 9
                }
            ]
    })

    console.log(initialize.matrices)

    return initialize
}()
var Board = function () {
    const body = document.body
    const boardWrapper = document.createElement("div")
    boardWrapper.setAttribute("class", "board_wrapper")
    body.appendChild(boardWrapper)

    let shiftSquare = 1
    for (let indexOfSquare = 0; indexOfSquare < 64; ++indexOfSquare) {
        const square = document.createElement("div")
        square.setAttribute("class", "square")
        square.setAttribute("data-indexOfSquare", indexOfSquare)

        if (indexOfSquare % 8 == 0) shiftSquare = !shiftSquare
        if ((indexOfSquare + shiftSquare) % 2 == 0) {
            square.style.backgroundColor = "#eeeed2"
            square.setAttribute("data-color", "#eeeed2")
        }
        else {
            square.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
            square.setAttribute("data-color", "rgba(0, 0, 0, 0.5)")
        }

        boardWrapper.appendChild(square)
    }
    return Array.from(boardWrapper.children)
}()

// text functions 
function capitalize(text) {
    const string = text.split('')
    const capitalizeString = string.map((item, index) => {
        if (index == 0) item = item.toUpperCase()
        else item = item.toLowerCase()
        return item
    }).join("")

    return capitalizeString
}


// chess functions
function createPiece(kingdomName, pieceName) {
    kingdomName = capitalize(kingdomName)
    pieceName = capitalize(pieceName)

    const piece = document.createElement("img")
    piece.setAttribute("class", "piece")
    piece.src = `${Theme.themePath}/${kingdomName}${pieceName}.${Theme.spriteExtension}`

    return piece
}
function createPieceByIndex(kingdomName, pieceName, indexOfSquare) {
    kingdomName = capitalize(kingdomName)
    pieceName = capitalize(pieceName)

    const piece = document.createElement("img")
    piece.setAttribute("class", "piece")
    piece.src = `${Theme.themePath}/${kingdomName}${pieceName}.${Theme.spriteExtension}`

    if (Board[indexOfSquare].children.length > 0) return Board[indexOfSquare].children[0]
    Board[indexOfSquare].appendChild(piece)

    return piece
}
function getPieceByIndex(indexOfSquare) {
    return Board[indexOfSquare].children[0]
}

function updatePiece(piece, newPice) {
    if(!piece || !newPice) return
    const parent = piece.parentElement
    const parentChildren = parent.children
    parentChildren[0].remove()
    parent.appendChild(newPice)

    return newPice
}
function updatePieceByIndex(newPice, indexOfSquare) {
    if(!newPice) return
    const square = Board[indexOfSquare]
    if(square.children.length == 1) {
        square.children[0].remove()
        square.appendChild(newPice)

        return newPice
    }
}
function appendPieceByIndex(piece, indexOfSquare) {
    // move initialize piece or append at empty square:
    if(!piece) return
    const square = Board[indexOfSquare]
    if(square.children.length == 0) {
        square.appendChild(piece)

        return piece
    }
    
}
function removePiece(piece) {
    piece.remove()
}
function removePieceByIndex(indexOfSquare) {
    Board[indexOfSquare].children[0].remove()
}
function forcePiece() {
    // force to add piece into empty/occupied square
}
function forcePieceByIndex(piece, indexOfSquare) {
    // force to add piece into empty/occupied square by index
    if(!piece) return
    const square = Board[indexOfSquare]
    console.log(square)
    if(square.children.length == 0){
        square.appendChild(piece)
        return piece
    }
    else if(square.children.length == 1){
        square.children[0].remove()
        square.appendChild(piece)
        return piece
    }
}

let bishop = createPieceByIndex("black","bishop",1)
let king = createPiece("white","king")
