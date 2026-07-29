export interface InteractionState {
  completed: boolean
  message: string
}

// #region trigger-handler
export function handleTrigger(playerName: string): InteractionState {
  const message = `${playerName} 已进入交互区域`

  return {
    completed: true,
    message,
  }
}
// #endregion trigger-handler

