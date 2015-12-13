export default function focusedReducer (focus = null, action) {
  switch (action.type) {
  case 'ACTIVATE_FOCUS':
    return action.id

  case 'DEACTIVATE_FOCUS':
    return null

  default:
    return focus
  }
}
