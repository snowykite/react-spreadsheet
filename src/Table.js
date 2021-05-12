import React from 'react'
import Row from './Row'
import Spreadsheet from './Spreadsheet'

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        const sheet = new Spreadsheet(props.y, props.x);
        this.state = {
            data: sheet,
            init: false
        }
    }
    handleChangedCell = ({x, y}, value) => {
        let curCell = this.state.data.cells[y][x];
        curCell.input(value, this.state.data.cells);
    }
    componentWillMount() {
        const {data, init} = this.state
        if (!init) {
            data.init().then(() => {
                this.setState({ init: true })
            })
        }
    }

    render() {
        const rows = []
        for (let y = 0; y < this.props.y; y++) {
            const rowData = this.state.data.cells[y] || {}
            rows.push(
                <Row
                    handleChangedCell={this.handleChangedCell}
                    updateCells={this.updateCells}
                    key={y}
                    y={y}
                    x={this.props.x}
                    rowData={rowData}
                />
            )
        }
        return <div>{rows}</div>
    }
}