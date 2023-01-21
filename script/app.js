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


var Board = function () {
    // includes hidden squares

    const body = document.body
    const boardWrapper = document.createElement("div")
    boardWrapper.setAttribute("class", "board_wrapper")
    body.appendChild(boardWrapper)

    let shiftSquare = 0
    //
    // touched pieces are previous pieces e.g. touchedPiece,isTouched,touchedSquare
    let touchedPiece = null
    let isTouched = false
    let touchedSquare = null
    let touchedPieceNotation = "NN"
    let touchedValidMoves = new Array()


    for (let indexOfSquare = 0; indexOfSquare < 168; ++indexOfSquare) {
        const square = document.createElement("div")
        square.setAttribute("class", "square")
        square.setAttribute("data-indexOfSquare", indexOfSquare)
        square.addEventListener("click", (squareEvent) => {
            const piece = square.children[0]
            const styleOfSquare = square.getAttribute("data-color")
            const hasPiece = (() => {
                return square.children.length
            })()
            if (hasPiece && !isTouched) {
                //touch
                touchedPiece = piece
                touchedSquare = square
                isTouched = !isTouched
                touchedPieceNotation = piece.getAttribute("data-piecenotation")

                square.style.backgroundColor = "lightgreen"
                touchedValidMoves = PieceMovement.movePieceByNotation(touchedPieceNotation, indexOfSquare)

                console.log("touched", indexOfSquare)
            }
            else if (isTouched && touchedPiece != piece && touchedValidMoves.includes(indexOfSquare)) {
                // move
                isTouched = !isTouched
                touchedPieceNotation = "NN"
                appendPieceByIndex(touchedPiece, indexOfSquare)

                touchedSquare.style.backgroundColor = touchedSquare.getAttribute("data-color")

                console.log("moved", indexOfSquare)
            }
            else if (isTouched && touchedPiece == piece) {
                //cancel
                touchedPiece = null
                touchedSquare = null
                isTouched = !isTouched

                square.style.backgroundColor = square.getAttribute("data-color")

                console.log("cancel", indexOfSquare)


            }

        })

        if (indexOfSquare % 12 == 0) shiftSquare = !shiftSquare
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

    const board = boardWrapper.children
    const squares = new Object()

    for (let indexOfSquare = 0; indexOfSquare < 14; indexOfSquare++) {
        // removing pointerEvents just in case
        board[indexOfSquare * 12].style.pointerEvents = "none"
        board[indexOfSquare * 12 + 1].style.pointerEvents = "none"
        board[indexOfSquare * 12 + 10].style.pointerEvents = "none"
        board[indexOfSquare * 12 + 11].style.pointerEvents = "none"

        board[indexOfSquare * 12].style.display = "none"
        board[indexOfSquare * 12 + 1].style.display = "none"
        board[indexOfSquare * 12 + 10].style.display = "none"
        board[indexOfSquare * 12 + 11].style.display = "none"
    }
    for (let indexOfSquare = 0; indexOfSquare < 36; indexOfSquare++) {
        // removing pointerEvents just in case
        board[indexOfSquare + 132].style.pointerEvents = "none"
        board[indexOfSquare].style.pointerEvents = "none"

        board[indexOfSquare].style.display = "none"
        board[indexOfSquare + 132].style.display = "none"
    }

    Object.assign(squares, {
        pawnAdvance: (() => {
            // fix later / refactor later
            const area = new Array()

            for (let indexOfSquare = 50; indexOfSquare < 58; indexOfSquare++) {
                area.push(indexOfSquare)
                area.push(indexOfSquare + 60)
            }
            return area.sort((a, b) => {
                return a - b
            })
        })()
    })

    Object.assign(squares, {
        getVisibleSquares: (() => {
            const visibleSquares = new Array()
            for (let indexOfSquare = 0; indexOfSquare < board.length; indexOfSquare++) {
                if (board[indexOfSquare].style.display != "none") {
                    visibleSquares.push(board[indexOfSquare])
                }
            }
            return visibleSquares;
        })()
    })
    Object.assign(squares, {
        getRawSquares: (() => {
            return board
        })()
    })

    return squares
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
    Object.assign(initialize, {
        initializeMatrix(piecesMatrix) {
            const visibleSquares = Board.getVisibleSquares

            visibleSquares.forEach((square, allocateIndexOnMatrix) => {
                const indexOfSquare = square.getAttribute("data-indexofsquare")
                const parsedPiece = parseNotationToPiece(piecesMatrix[allocateIndexOnMatrix])
                const kingdom = parsedPiece[0]
                const piece = parsedPiece[1]

                createPieceByIndex(kingdom, piece, indexOfSquare)
            })

        }
    })

    return initialize
}()
Init.initializeMatrix(Init.matrices)

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
function parseNotationToPiece(notation) {
    if (!notation) return
    notation = notation.toUpperCase()

    const pieceName = new Array(2)

    const kingdomNotation = notation.split("")[0]
    const pieceNotation = notation.split("")[1]

    const kingdomCollection = Init.kingdoms
    const pieceCollection = Init.pieces

    kingdomCollection.forEach((kingdom, kingdomIndex) => {
        if (kingdomNotation == kingdom[0]) pieceName[0] = kingdom
    })
    pieceCollection.forEach((piece, indexOfPiece) => {
        if (pieceNotation == piece["abbr"]) pieceName[1] = piece["name"]
    })

    return pieceName
}
function parsePieceToNotation(kingdomNotation, pieceNotation) {
    if (!kingdomNotation || !pieceNotation) return
    kingdomNotation = capitalize(kingdomNotation)
    pieceNotation = capitalize(pieceNotation)

    const notation = new Array(2)

    const kingdomCollection = Init.kingdoms
    const pieceCollection = Init.pieces

    kingdomCollection.forEach((kingdom, kingdomIndex) => {
        if (kingdomNotation == kingdom) notation[0] = kingdom[0]
    })
    pieceCollection.forEach((piece, indexOfPiece) => {
        if (pieceNotation == piece["name"]) notation[1] = piece["abbr"]
    })

    return notation
}

class PieceMovement {
    static movePieceByNotation(notation, indexOfSquare) {

        const pieceOfKingdom = parseNotationToPiece(notation)
        const pieceBias = (() => {
            switch (pieceOfKingdom[0]) {
                case "White": return -1
                case "Black": return 1
                default: 0
            }
        })()

        const pieceMovement = (() => {
            switch (pieceOfKingdom[1]) {
                case "Pawn": {
                    return Board.pawnAdvance.includes(indexOfSquare) ? PieceMatrix.PawnMatrix(indexOfSquare, pieceBias).validAdvance : PieceMatrix.PawnMatrix(indexOfSquare, pieceBias).validMoves
                }
                case "Rook": {
                    return PieceMatrix.RookMatrix(indexOfSquare).validMoves
                }
                case "Knight": {
                    return PieceMatrix.RookMatrix(indexOfSquare).validMoves
                }
                default: return
            }
        })()
        return pieceMovement
    }
}

class PieceMatrix {
    static PawnMatrix(indexOfSquare, bias) {
        const matrix = new Object()
        Object.assign(matrix, {
            validMoves: (() => {
                return [12].map((indexOfValidMove) => {
                    return (indexOfValidMove * bias) + indexOfSquare
                })
            })()
        })
        Object.assign(matrix, {
            validAttack: (() => {
                return [11, 13].map((indexOfValidMove) => {
                    return (indexOfValidMove * bias) + indexOfSquare
                })
            })()
        })
        Object.assign(matrix, {
            validAdvance: (() => {
                return [12, 24].map((indexOfValidMove) => {
                    return (indexOfValidMove * bias) + indexOfSquare
                })
            })()
        })
        return matrix
    }
    static RookMatrix(indexOfSquare, bias) {
        const matrix = new Object()
        Object.assign(matrix, {
            validMoves: (() => {
                return (() => {
                    const rookMatrices = new Array()
                    for (let indexOfValidMove = 0; indexOfValidMove < 8; indexOfValidMove++) {
                        rookMatrices.push(indexOfValidMove + indexOfSquare)
                        rookMatrices.push(-indexOfValidMove + indexOfSquare)
                        rookMatrices.push(12 * indexOfValidMove + indexOfSquare)
                        rookMatrices.push(12 * -indexOfValidMove + indexOfSquare)
                    }

                    // console.log()
                    return rookMatrices.filter((indexOfValidMove) => {
                        return indexOfValidMove != indexOfSquare
                    }).sort((a, b) => {
                        return a - b
                    })
                })()
            })()
        })
        Object.assign(matrix, {
            validAttack: (() => {
                return (() => {
                    const rookMatrices = new Array()
                    for (let indexOfValidMove = 0; indexOfValidMove < 8; indexOfValidMove++) {
                        rookMatrices.push(indexOfValidMove + indexOfSquare)
                        rookMatrices.push(-indexOfValidMove + indexOfSquare)
                        rookMatrices.push(12 * indexOfValidMove + indexOfSquare)
                        rookMatrices.push(12 * -indexOfValidMove + indexOfSquare)
                    }

                    // console.log()
                    return rookMatrices.filter((indexOfValidMove) => {
                        return indexOfValidMove != indexOfSquare
                    }).sort((a, b) => {
                        return a - b
                    })
                })()
            })()
        })
        return matrix
    }
    static KnightMatrix(indexOfSquare, bias) {
        //todo im tired fix these tomorrow
        const matrix = new Object()
        Object.assign(matrix, {
            validMoves: [-17, -15, -10, -6, 6, 10, 15, 17].map((indexOfValidMove) => {
                return indexOfValidMove + indexOfSquare
            })
        })
        Object.assign(matrix, {
            validMoves: [-17, -15, -10, -6, 6, 10, 15, 17].map((indexOfValidMove) => {
                return indexOfValidMove + indexOfSquare
            })
        })

        return matrix
    }
}


// chess functions
function createPiece(kingdomName, pieceName) {
    if (kingdomName == "None" || pieceName == "None") return

    kingdomName = capitalize(kingdomName)
    pieceName = capitalize(pieceName)

    const piece = document.createElement("img")
    piece.setAttribute("class", "piece")
    piece.setAttribute("data-piecenotation", parsePieceToNotation(kingdomName, pieceName).join(""))
    piece.src = `${Theme.themePath}/${kingdomName}${pieceName}.${Theme.spriteExtension}`

    return piece
}
function createPieceByIndex(kingdomName, pieceName, indexOfSquare) {
    if (kingdomName == "None" || pieceName == "None") return

    kingdomName = capitalize(kingdomName)
    pieceName = capitalize(pieceName)

    const piece = document.createElement("img")
    piece.setAttribute("class", "piece")
    piece.setAttribute("data-piecenotation", parsePieceToNotation(kingdomName, pieceName).join(""))
    piece.src = `${Theme.themePath}/${kingdomName}${pieceName}.${Theme.spriteExtension}`

    if (Board.getRawSquares[indexOfSquare].children.length > 0) return Board.getRawSquares[indexOfSquare].children[0]
    Board.getRawSquares[indexOfSquare].appendChild(piece)

    return piece
}
function getPieceByIndex(indexOfSquare) {
    return Board.getRawSquares[indexOfSquare].children[0]
}

function updatePiece(piece, newPice) {
    if (!piece || !newPice) return
    const parent = piece.parentElement
    const parentChildren = parent.children
    parentChildren[0].remove()
    parent.appendChild(newPice)

    return newPice
}
function updatePieceByIndex(newPice, indexOfSquare) {
    if (!newPice) return
    const square = Board.getRawSquares[indexOfSquare]
    if (square.children.length == 1) {
        square.children[0].remove()
        square.appendChild(newPice)

        return newPice
    }
}
function appendPieceByIndex(piece, indexOfSquare) {
    // move initialize piece or append at empty square:
    if (!piece) return
    const square = Board.getRawSquares[indexOfSquare]
    if (square.children.length == 0) {
        square.appendChild(piece)

        return piece
    }

}
function removePiece(piece) {
    piece.remove()
}
function removePieceByIndex(indexOfSquare) {
    Board.getRawSquares[indexOfSquare].children[0].remove()
}
function forcePiece() {
    // force to add piece into empty/occupied square
}
function forcePieceByIndex(piece, indexOfSquare) {
    // force to add piece into empty/occupied square by index
    if (!piece) return
    const square = Board.getRawSquares[indexOfSquare]
    if (square.children.length == 0) {
        square.appendChild(piece)
        return piece
    }
    else if (square.children.length == 1) {
        square.children[0].remove()
        square.appendChild(piece)
        return piece
    }
}

let bishop = createPieceByIndex("black", "bishop", 1)
let king = createPiece("white", "king")
