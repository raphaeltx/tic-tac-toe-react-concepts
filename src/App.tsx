import { useState } from "react";
import GameBoard from "./components/GameBoard/Gameboard";
import Player from "./components/Player/Player";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from './winning-combinations'
import GameOver from "./components/GameOver/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD: any[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns: any) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer;
}

function deriveWinner(players: any, gameBoard: any) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner
}

function deriveGameBoard(gameTurns: any) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  // states
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([] as any);

  // board, players, game over
  const currentPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(players, gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleClickSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns: any) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updateTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: string, newName: string) {
    setPlayers((prevPlayers: any) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={currentPlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={currentPlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onClickSquare={handleClickSquare} activePlayerSymbol={currentPlayer} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
