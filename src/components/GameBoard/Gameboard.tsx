export default function GameBoard({ onClickSquare, board }: any) {
  return (
    <ol id="game-board">
      {board.map((row: any[], rowIndex: number) =>
        <li key={rowIndex}>
          <ol>{row.map((playerSymbol: string, colIndex: number) =>
            <li key={colIndex}>
              <button onClick={() => onClickSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                {playerSymbol}
              </button>
            </li>
          )}</ol>
        </li>
      )}
    </ol>
  );
}