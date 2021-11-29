/**
 * #################
 * ## checkWinner ##
 * #################
 *
 * Dado un array con 9 posiciones('x', '0', null) comprueba si hay un ganador (x, o)
o si hay un empate

* Comprobamos si ya hay un ganador. Para ello debemos comprobar todas las combinaciones ganadoras
 * posibles.
 *
 *  - Si el ganador es el jugador 1 (la X) retornamos un mensaje de victoria.
 *
 *  - Si el ganador es el jugador 2 (la O) retornamos un mensaje de victoria.
 *
 *  - Si no hay más intentos y hubo empate retornamos un mensaje de empate.
 *
 *  - En cualquier otra circunstancia retornamos un false;
 *
 */

import State from '../js/state';

const board = ['X', 'O', 'X', 'X', 'O', null, 'X', null, null];

const checkWinner = (board) => {
  const solutions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [2, 4, 6],
  ];
  const jugador1 = 'X';
  const jugador2 = 'O';
  for (let i = 0; i < solutions.length; i++) {
    const [a, b, c] = solutions[i];
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
      const ganador = arr[0];
      return `jugador ${ganador} has ganado`;
    } else if (!arr.board.includes(null)) {
      return 'empate';
    } else {
      return false;
    }
  }
};
checkWinner(board);
console.log();
