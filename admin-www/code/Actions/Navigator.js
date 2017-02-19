import ActionsType from 'ActionsType'

export function change(navigator) {
  return {
    type: ActionsType.NAVIGATOR_CHANGE,
    value: navigator
  }
}
