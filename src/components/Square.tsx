// Square.js
import React from 'react'

type SquareProps = {
    value: string
    onClick: () => void
}

const Square: React.FC<SquareProps> = (props: SquareProps) => {
    const { value, onClick } = props

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    )
}

export default React.memo(Square)
