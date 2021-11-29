'use strict';

// Obtenemos todos los elementos necesarios desde el localStorage.

const board = localStorage.getItem('board');
const round = localStorage.getItem('round');

/**
 *  Inicializamosel estado. Si hay algún valor en el localStorage lo tomamos de ahí,
 *  de lo contrario inicializamos por defecto:
 *
 *      - board = Array(9).fill(null)
 *      - round = 0
 *
 */
const State = {
  board: board ? JSON.parse(board) : Array(9).fill(null),
  round: round ? JSON.parse(round) : 0,
};

/**
 * ###############
 * ## saveState ##
 * ###############
 *
 * Función que se encarga de guardar en localStorage el estado actual del State.
 * Recuerda que el State tiene dos propiedades, debes guardar las dos.
 *
 */
const saveState = () => {
  localStorage.setItem('board', JSON.stringify(State.board));
  localStorage.setItem('round', JSON.stringify(State.round));
};

/**
 * #################
 * ## updateState ##
 * #################
 *
 * En funcion de la casilla que seleccione el jugador actual cambiamos el valor
 * del tablero y pasamos a la siguiente ronda.
 *
 * Guardamos el State.
 *
 */

const updateState = (index, value) => {
  State.board[index] = value;
  State.round++;
  saveState();
};

/**
 * ################
 * ## resetState ##
 * ################
 *
 * Si el juego finaliza debemos permitir al jugador resetear la partida a los valores
 * por defecto.
 *
 * Guardamos el State.
 *
 */

const resetState = () => {
  State.board = Array(9).fill(null);
  State.round = 0;
  saveState();
};

/**
 * #################
 * ## checkWinner ##
 * #################
 *
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
const checkWinner = () => {
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
    if (
      State.board[a] &&
      State.board[a] === State.board[b] &&
      State.board[a] === State.board[c]
    ) {
      const ganador = State.board[a];
      return `Jugador ${ganador} has ganado`;
    }
  }
  if (!State.board.includes(null)) {
    return 'Empate';
  } else {
    return false;
  }
};

export default State;
export { updateState, resetState, checkWinner };
