let board = "WWRRBBWW";
let hand = "WRBRW";

let getBoard = (board = "WWRRBBWW") => {
    let map = new Map();
    for (let i = 0; i < board.length; i++) {
        if (!map.has(board[i])) {
            map.set(board[i], [i]);
        } else {
            map.get(board[i]).push(i);
        }
    }
    return map;
};

console.log(getBoard(board));
