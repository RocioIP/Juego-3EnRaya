'use strict';

import State, { updateState, resetState, checkWinner } from './state.js';

// Seleccionamos todos los nodos con los que vamos a trabajar.

const firstRow = document.querySelector('div.first-row');
const secondRow = document.querySelector('div.second-row');
const thirdRow = document.querySelector('div.third-row');
const main = document.querySelector('main');

//seleccionamos tablero
const board = document.querySelector('div.board');

/**
 * #######################
 * ## handleSquareClick ##
 * #######################
 *
 * Esta función manejadora dicta lo que sucede cada vez que un jugador
 * hace click en un cuadrado.
 *
 *  - Si el objetivo es el div con clase "square" comprobamos qué jugador
 *    está jugando: rondas pares "X" rondas impares "O".
 *
 *  - Posteriormente obtenemos el index del cuadrado sobre el que pulsamos.
 *
 *  - Actualizamos el tablero.
 *
 *  - Renderizamos los cambios en el HTML.
 *
 */
const handleSquareClick = (e) => {
  const target = e.target;
  if (target.matches('div.square')) {
    const player = State.round % 2 === 0 ? 'X' : 'O';
    const index = target.getAttribute('data-index');
    updateState(index, player);
    render();
  }
  e.target.textContent;
};

// Agregamos el evento de click al div con clase "board".
board.addEventListener('click', handleSquareClick);

/**
 * ######################
 * ## Resetear partida ##
 * ######################
 *
 * Agregamos un manejador de evento al main que compruebe si el elemento
 * clickado es el div con clase "reset". Si es así:
 *
 *  - Eliminamos el elemento padre.
 *
 *  - Reseteamos el tablero.
 *
 *  - Activamos de nuevo la función manejadora "handleSquareClick"
 *
 */

main.addEventListener('click', (e) => {
  const target = e.target;
  if (target.matches('.reset>*')) {
    target.parentElement.remove();
    resetState();
    board.addEventListener('click', handleSquareClick);
    render();
  }
});

/**
 * ############
 * ## Render ##
 * ############
 */

function render() {
  // 1. Vaciamos las tres filas de casillas.

  firstRow.innerHTML = '';
  secondRow.innerHTML = '';
  thirdRow.innerHTML = '';

  // 2. Creamos las filas. Para ello debemos recorrer el tablero (board).

  /* State.board; */
  for (let i = 0; i < State.board.length; i++) {
    // 3. Creamos un div y le agregamos el contenido de la posición actual
    // del tablero.
    const square = document.createElement('div');
    square.textContent = State.board[i];
    // 4. Agregamos al div la clase "square" y el atributo "data-index" con
    // el valor del index actual.

    square.classList.add('square');
    square.setAttribute('data-index', i);
    // 5. Recuerda que el tablero tiene 9 elementos. Los tres primeros son
    // las casillas de la primera fila, los 3 siguientes las casillas de
    // la segunda fila, y los tres últimos son las casillas de la última
    // fila. Agrega las casillas como hijo de la fila correspondiente.
    if (i < 3) {
      firstRow.append(square);
    } else if (i < 6) {
      secondRow.append(square);
    } else {
      thirdRow.append(square);
    }
  }

  // 6. Almacenamos el valor que retorne la función winner.
  const winner = checkWinner();
  // 7. Si hay un ganador...
  // 8. Eliminamos el event listener que permite clickar en los divs,
  // es decir, en cada casilla.
  if (winner) {
    board.removeEventListener('click', handleSquareClick);

    // 9. Creamos un div y le agregamos la clase "reset".

    const reset = document.createElement('div');
    reset.classList.add('reset');

    // 10. Agregamos al div un párrafo con un mensaje que indique el resultado
    // de la partida y un h2 que diga "Try againg".

    reset.innerHTML = `<p>${winner}</p>
  <h2>TRY AGAIN</h2>`;
    // 11. Agregamos al main el div.
    main.append(reset);
  }
}

render();
