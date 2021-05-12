import {calculate} from './Formula';


export default class Cell {
    constructor(sheet) {
        this.status = 0; // status 0-empty; status 1-integer; status 2-formula; status 3-error;
        this.value = 0;
        this.listener = new Set([]);
        this.formula = '';
        this.sheet = sheet;
        this.updateCb = undefined;
    }

    input (s) {
        if (s ==='') {
            this.value = 0;
            this.status = 0;
            return;
        }
        if (s.match(/^[\-]?[0-9]+$/) !== null) {
            this.value = parseInt(s);
            this.status = 1;
            this.updateCb();
            this.updateListener();
            return;
        }
        if (s.charAt(0) === '=') {
            this.formula = s;
            this.update();
        } else {
            this.status = 3;
        }
    }

    addListener(cell) {
        this.listener.add(cell);
    }

    setUpdateCallBack(cb) {
        this.updateCb = cb;
    }

    update() {
        try {
            this.value = calculate(this, this.sheet);
            this.status = 2;
        } catch (e) {
            console.warn(e);
            this.status = 3;
        }
        this.updateCb();
        this.updateListener();
    }

    updateListener() {
        const listeners = this.listener.values();
        for (let listener of listeners) {
            listener.update();
        }
    }

    display() {
        switch (this.status) {
            case 0:
                return ''
            case 1:
                return `${this.value}`
            case 2:
                return `${this.value}`
            default:
                return `#ERROR`
        }
    }

    edit() {
        switch (this.status) {
            case 1:
                return `${this.value}`
            case 2:
                return this.formula || ''
            default:
                return ''
        }
    }
}