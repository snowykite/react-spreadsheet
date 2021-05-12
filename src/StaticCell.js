export const StaticSquare = ({x, y}) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let display = ''
    if (x === 0 && y > 0) {
        // 1st column, fill with number
        display = `${y}`
    } else {
        // 1st row, fill with letter
        display = `${letters.charAt(x - 1)}`
    }
    return <span className="cell head">{display}</span>
}
