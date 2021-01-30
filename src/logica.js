// criando a lógica do jogo, séra usado três funções 

const createBoard = (rows, columns) => {

    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row: row,
                column,
                opened: false,
                mined: false, 
                exploded: false,
                nearMines: 0
            }
        })
    })
}


const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
}


// unica funcao que será importada 
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board

}

// uma funcao que vai clonar um tabuleiro

const cloneBoard = board => {
    return board.map( rows => {
        return rows.map(field => {
            return {...field}
        })
    })
}
// outra funcao que vai pegar os vizinhos
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
           if(diferent && validRow && validColumn){
               neighbors.push(board[r][c])
           }

        })
    })
    return neighbors
}
// outra funcao e pra saber sobre a vizinha, se ela e segura   

const safeNeighborhood = (board, row, column) => {

    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}
// a funcao será responsavel para abrir os campos, ao momento que o usuario clicar para abrir 
const openField = (board, row, column) => {
    const field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        }else if (safeNeighborhood(board,row, column)){
            getNeighbors(board, row, column)
            .forEach(n => openField(board, n.row, n.column))
        }else {
        const neighbors = getNeighbors(board, row, column)
        field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

// uma funcao para percorrer todos os campos

const fields = board => [].concat(...board)

const hadExplosion = board => fields(board)
.filter(field => field.exploded).length > 0
const pendding = field => (field.mined && !field.flagged)
|| (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pendding).length === 0

// mostrar as minas que esta no jogo 

const showMines = board => fields(board).filter(field => field.mined)
.forEach(field => field.opened = true)

const inverteFlag = (board, row,column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const bandeiraUsed = board => fields(board)
.filter(field => field.flagged).length
export {
     createMinedBoard, 
     cloneBoard,
     openField,
     hadExplosion,
     wonGame,
     showMines,
     inverteFlag ,
     bandeiraUsed
}