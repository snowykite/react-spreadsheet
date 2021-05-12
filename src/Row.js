import React from 'react';
import Square from './Square';
import {StaticSquare} from './StaticCell';

const Row = props => {
    const cells = []
    const y = props.y
    for (let x = 0; x < props.x; x++) {
        const cell = (x === 0 || y === 0) ? <StaticSquare
                key={`${x}-${y}`}
                x={x}
                y={y}
            /> : <Square
                    key={`${x}-${y}`}
                    y={y-1}
                    x={x-1}
                    onChangedValue={props.handleChangedCell}
                    updateCells={props.updateCells}
                    value={props.rowData[x-1]}
            />
        cells.push(cell)
    }
    return <div>{cells}</div>
}
export default Row