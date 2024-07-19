export default function Log({ turns }: any) {
  return (
    <ol id="log">
      {turns.map((turn: any) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  )
}