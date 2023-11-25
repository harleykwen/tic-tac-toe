import React, { useState } from 'react'
import Square from './Square'

type BoardProps = {
    gridSize: number
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const { gridSize } = props

    const [squares, setSquares] = useState(Array(gridSize).fill(null).map(() => Array(gridSize).fill(null)))
    const [isXNext, setIsXNext] = useState(true)

    function calculateWinner(squares: any) {
        const squareSize = squares.length
        for (let i = 0; i < squareSize; i++) {
            if (squares[i].every((square: any) => square === squares[i][0] && square !== null)) {
                return squares[i][0]
            }
            if (squares.every((row: any) => row[i] === squares[0][i] && row[i] !== null)) {
                return squares[0][i]
            }
        }
        if (
            squares.every((row: any, index: any) => row[index] === squares[0][0] && row[index] !== null) ||
            squares.every((row: any, index: any) => row[squareSize - 1 - index] === squares[0][squareSize - 1] && row[squareSize - 1 - index] !== null)
        ) {
            return squares[0][0]
        }
        return null
    }

    function calculateDraw() {
        for (let i = 0; i < squares.length; i++) {
            for (let j = 0; j < squares[i].length; j++) {
                if (squares[i][j] === null) {
                    return false
                }
            }
        }
        return true
    }

    function handleClick(row: any, col: any) {
        if (squares[row][col] || calculateWinner(squares)) {
            return
        }

        const newSquares = squares.map(row => [...row])
        newSquares[row][col] = isXNext ? 'X' : 'O'

        setSquares(newSquares)
        setIsXNext(!isXNext)
    }

    function renderSquare(row: any, col: any) {
        return (
            <Square
                key={col}
                value={squares[row][col]}
                onClick={() => handleClick(row, col)}
            />
        )
    }

    function renderBoard() {
        return squares.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
                {row.map((_, colIndex) => renderSquare(rowIndex, colIndex))}
            </div>
        ))
    }

    return (
        <div className='board'>
            {
                calculateDraw()
                    ?   <p className='board-information'>The game is draw!</p>
                    :   calculateWinner(squares)
                        ?   <p className='board-information'>{calculateWinner(squares)} win the game!</p>
                        :   <p className='board-information'>Current move: {isXNext ? 'X' : 'O'}</p>
            }

            <div>
                {renderBoard()}
            </div>
            <button 
                className='btn-primary'
                onClick={() => {
                    setSquares((Array(gridSize).fill(null).map(() => Array(gridSize).fill(null))))
                    setIsXNext(true)
                }}
            >Reset</button>
        </div>
    )
}

export default Board