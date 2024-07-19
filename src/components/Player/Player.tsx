import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }: any) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleButtonClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) onChangeName(symbol, playerName)
  }

  function handleChange(event: any) {
    setPlayerName(event.target.value);
  }

  let buttonCaption = !isEditing ? "Edit" : "Save";
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButtonClick}>{buttonCaption}</button>
    </li>
  )
}