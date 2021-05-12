import Cell from './Cell';
import axios from 'axios';

export default class Spreadsheet {
    cells = [];
    hm = {A:0, B:1, C:2, D:3, E:4, F:5, G:6, H:7, I:8, J:9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16};
    timer = undefined;

    constructor(x,y) {
        this.x = x || 11;
        this.y = y || 11;
    }

    init() {
        for (let i = 0; i < this.x; i++) {
            const row = [];
            for (let j = 0; j < this.y; j++) {
                row.push(new Cell(this));
            }
            this.cells.push(row);
        }
        // trying loading data from api
        return this.loadSaved().then(() => {
            if (!this.timer) {
                // save per 5 seconds
                this.timer = setInterval(() => this.save(), 5000);
            }
        })
    }

    loadSaved() {
        const url = 'http://localhost:5000/api/table'
        return axios.get(url).then(({data}) => {
            if (!data) return;
            const {x, y, cells} = data
            if (this.x === x && this.y === y) {
                this.cells.forEach((row, rowNum) => row.forEach((cell, cellNum) => {
                    // call input to trigger the full render chain
                    cell.input(cells[rowNum][cellNum]);
                }))
            }
        }).catch(e => {
            console.warn(e);
        })
    }

    save() {
        const url = 'http://localhost:5000/api/table'
        const data = this.cells.map(row => row.map(cell => {
            // always try to save formula, even it has error
            if (cell.formula) {
                return cell.formula;
            }
            if (cell.status === 1) {
                return `${cell.value}`
            }
            return ''
        }))
        return axios.post(url, {
            x: this.x,
            y: this.y,
            cells: data,
        }).catch(e => console.warn(e))
    }

    idToCell(s) {
        let y = this.hm[s.charAt(0)];
        let x = parseInt(s.substr(1));
        return this.cells[x][y];
    }
}