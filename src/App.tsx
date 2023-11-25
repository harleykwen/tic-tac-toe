import React, { useState } from 'react'
import Board from './components/Board'

const App: React.FC = () => {
    const [isFormShow, setIsFormShow] = useState<boolean>(true)
    const [gridSize, setGridSize] = useState<string>('3')

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>

            {isFormShow
                ?   <form 
                        className='game-form' 
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault()
                            setIsFormShow(false)
                        }}
                    >
                        <input 
                            className='input-primary'
                            type="number" 
                            value={gridSize} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (Number(e.target.value) < 3 || e.target.value === '') return
                                setGridSize(e.target.value)
                            }} 
                            min={3}
                        />
                        <button type='submit' className='btn-primary'>Create Board</button>
                    </form>
                :   <div className="game-board">
                        <Board gridSize={Number(gridSize)} />
                    </div>
            }
        </div>
    )
}

export default App