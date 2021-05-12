const supportOperator = new Set(['+']);

function handleValue(sub, originalCell, sheet) {
    if (sub.match(/^[\-]?[0-9]+$/) !== null) {
        return parseInt(sub);
    }
    const cell = sheet.idToCell(sub);
    if (cell) {
        cell.addListener(originalCell);
        return cell.status === 4 ? undefined : cell.value;
    }
    return undefined;
}

export function calculate(cell, sheet) {
        const s = cell.formula.toUpperCase();
        let stack = [];
        let j = 1;
        for (let i = 1; i < s.length; i++) {
            if (supportOperator.has(s.charAt(i))) {
                const sub = s.substr(j, i - j);
                const val = handleValue(sub, cell, sheet);
                if (val !== undefined) {
                    stack.push(val);
                    j = i+1;
                }
                else {
                    throw new Error(`Invalid parameter ${sub}`);
                }
            }
        }
        const left = handleValue(s.substr(j), cell, sheet);
        if (left !== undefined) {
            stack.push(left);
        } else {
            throw new Error(`Invalid parameter`);
        }
        let result = 0;
        for (let i = 0; i < stack.length; i++) {
            result += stack[i];
        }
        return result;
}